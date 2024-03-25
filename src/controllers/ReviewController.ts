import { AppDataSource } from "../index";
import { Request, Response } from "express";

import { HolidayHome } from "../entities/HolidayHome";
import { UserInteresed } from "../entities/User";

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
              "MainImage"
            ],
            where:{
              Status: "Active",
              Approved: true
            }
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
            rating.push({ holiday_home: interested_value[i], rating: total, seperated:seperated });
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

export { reviewSentiment, getHolidayHomesSorted };
