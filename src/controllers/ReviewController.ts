import { AppDataSource } from "../index";
import { Request, Response } from "express";

import { HolidayHome } from "../entities/HolidayHome";
import { UserInteresed } from "../entities/User";
import { Reservation } from "../entities/Reservation";
import { Review } from "../entities/Review";

// import natural
import natural from "natural";

// initialize natural
const Analyzer = natural.SentimentAnalyzer;
const stemmer = natural.PorterStemmer;
const analyzer = new Analyzer("English", stemmer, "afinn");

function interpretSentiment(score: number) {
  if (score > 0.5) return "Strongly Positive";
  if (score > 0) return "Positive";
  if (score === 0) return "Neutral";
  if (score > -0.5) return "Negative";
  return "Strongly Negative";
}

// test natural
const tests = [
  { input: "I love this tutorial" },
  { input: "I hate this tutorial" },
  { input: "This is an average tutorial" },
  { input: "This is the best tutorial ever" },
  { input: "This is the worst tutorial ever" },
];

// tests.forEach((test, index) => {
//   const result = analyzer.getSentiment(test.input.split(" "));
//   const humanReadable = interpretSentiment(result);

//   console.log(`Test ${index + 1}: Score is ${result} - ${humanReadable}`);
// });

// review sentiment
const reviewSentiment = async (req: Request, res: Response) => {
  const { review } = req.body;
  const result = analyzer.getSentiment(review.split(" "));
  const humanReadable = interpretSentiment(result);
  res.status(200).json({ score: result, sentiment: humanReadable });
};

// get all holiday homes and save max rating holiday home
const getHolidayHomesSorted = async (req: Request, res: Response) => {
  const serviceNo = (req as any).serviceNo;
  try {
    // get interested
    await AppDataSource.manager
      .find(UserInteresed, {
        where: {
          service_number: serviceNo,
        },
      })
      .then(async (interested) => {
        if (interested) {
          const inter1 = interested[0].interested_1;
          const inter2 = interested[0].interested_2;
          const inter3 = interested[0].interested_3;

          const user = await AppDataSource.manager.find(HolidayHome, {
            select: [
              "HolidayHomeId",
              inter1 as keyof HolidayHome,
              inter2 as keyof HolidayHome,
              inter3 as keyof HolidayHome,
              "Name",
              "Address",
              "overall_rating",
              "MainImage",
            ],
            where: {
              Status: "Active",
              Approved: true,
            },
          });

          let rating = [];
          let inter1_weight = 0.5;
          let inter2_weight = 0.3;
          let inter3_weight = 0.2;

          // convert to json object
          const interested_value = JSON.parse(JSON.stringify(user));

          // calculate new rating
          for (let i = 0; i < interested_value.length; i++) {
            let total = 0;
            total += interested_value[i][inter1] * inter1_weight;
            total += interested_value[i][inter2] * inter2_weight;
            total += interested_value[i][inter3] * inter3_weight;

            const seperated = {
              inter1: {
                name: inter1,
                value: interested_value[i][inter1],
              },
              inter2: {
                name: inter2,
                value: interested_value[i][inter2],
              },
              inter3: {
                name: inter3,
                value: interested_value[i][inter3],
              },
            };
            rating.push({
              holiday_home: interested_value[i],
              rating: total,
              seperated: seperated,
            });
          }

          // select maxmimum 5 rated holiday homes
          rating.sort((a, b) => b.rating - a.rating);
          const interested_hh = rating.slice(0, 6);

          res.status(200).json({ interested_hh, interested: true });
        } else {
          res.status(200).json({ interested: false });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: "Internal Server error" });
      });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ message: "Internal Server error" });
  }
};

//calculate new rating
const calculateRating = (reviewCount: number, oldrating : number, newrating: number) => {
  let newRating = 0;
  
  newRating = (oldrating * reviewCount + newrating) / (reviewCount + 1);

  return newRating;
};

// add user review and update overall rating
const addUserReview = async (req: Request, res: Response) => {
  const values = req.body;
  const serviceNo = (req as any).serviceNo;

  //get data from db
  let reviewCount = 0;
  let oldfr = 0;
  let oldvfmr = 0;
  let oldsr = 0;
  let oldlr = 0;
  let oldftr = 0;
  let oldwr = 0;

  await AppDataSource.manager
    .find(Reservation, {
      where: {
        ReservationId: values.reservationID,
      },
    })
    .then(async (res) => {
      if (res) {
        await AppDataSource.manager
          .find(Review, {
            where: {
              HolidayHomeId: res[0].HolidayHome,
            },
          })
          .then((rev) => {
            reviewCount = rev.length;
          });

        await AppDataSource.manager
        .find(HolidayHome, {
          where: {
            HolidayHomeId: res[0].HolidayHome,
          },
        })
        .then((rev) => {
          oldfr = rev[0].food_rating;
          oldvfmr = rev[0].value_for_money_rating;
          oldsr = rev[0].staff_rating;
          oldlr = rev[0].location_rating;
          oldftr = rev[0].furniture_rating;
          oldwr = rev[0].wifi_rating;

        });
        await AppDataSource.manager.update(HolidayHome,
            {HolidayHomeId: HolidayHome},
            {food_rating: calculateRating(reviewCount,oldfr,values.food_rating),
              value_for_money_rating: calculateRating(reviewCount,oldvfmr,values.value_for_money_rating),
              staff_rating:calculateRating(reviewCount,oldsr,values.staff_rating),
              location_rating:calculateRating(reviewCount,oldlr,values.location_rating),
              furniture_rating:calculateRating(reviewCount,oldfr,values.furniture_rating),
              wifi_rating:calculateRating(reviewCount,oldwr,values.wifi_rating),
            }
        );
      }
    });

  console.log(values);
  res.status(200).json({ message: "add user details", success: true });
};

  // get user review
  const getUserReview = async (req: Request, res: Response) => {
    res.status(200).json("get user details");
  };

   


export { reviewSentiment, getHolidayHomesSorted, addUserReview, getUserReview };
