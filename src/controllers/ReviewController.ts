import { AppDataSource } from "../index";
import { Request, Response } from "express";

import { HolidayHome } from "../entities/HolidayHome";
import { UserInteresed } from "../entities/User";
import { Reservation } from "../entities/Reservation";
import { Review } from "../entities/Review";
import { WishList } from "../entities/WishList";

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
            const isFavourite = await AppDataSource.manager.find(WishList, {
              where: {
                service_number: serviceNo,
                holidayHomeId: interested_value[i].HolidayHomeId,
              },
            });
            rating.push({
              holiday_home: interested_value[i],
              rating: total,
              seperated: seperated,
              isWishListed:
                isFavourite && isFavourite.length > 0 ? true : false,
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
const calculateRating = (
  reviewCount: number,
  oldrating: number,
  newrating: number
) => {
  let newRating = 0;

  newRating = (oldrating * reviewCount + newrating) / (reviewCount + 1);

  return newRating;
};

// add user review and update overall rating
const addUserReview = async (req: Request, res: Response) => {
  const values = req.body;
  const serviceNo = (req as any).serviceNo;

  try {
    //get data from database
    let reviewCount = 0;
    let newfr = 0;
    let newvfmr = 0;
    let newsr = 0;
    let newlr = 0;
    let newftr = 0;
    let newwr = 0;
    let overallRating =
      (values.food_rating +
        values.value_for_money_rating +
        values.staff_rating +
        values.location_rating +
        values.furniture_rating +
        values.wifi_rating) /
      6;
    let newOveralRating = 0;

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
            .then(async (rev) => {
              newfr = calculateRating(
                reviewCount,
                rev[0].food_rating,
                values.food_rating
              );
              newvfmr = calculateRating(
                reviewCount,
                rev[0].value_for_money_rating,
                values.value_for_money_rating
              );
              newsr = calculateRating(
                reviewCount,
                rev[0].staff_rating,
                values.staff_rating
              );
              newlr = calculateRating(
                reviewCount,
                rev[0].location_rating,
                values.location_rating
              );
              newftr = calculateRating(
                reviewCount,
                rev[0].furniture_rating,
                values.furniture_rating
              );
              newwr = calculateRating(
                reviewCount,
                rev[0].wifi_rating,
                values.wifi_rating
              );
              newOveralRating = calculateRating(
                reviewCount,
                rev[0].overall_rating,
                overallRating
              );

              await AppDataSource.manager.update(
                HolidayHome,
                { HolidayHomeId: res[0].HolidayHome },
                {
                  food_rating: newfr,
                  value_for_money_rating: newvfmr,
                  staff_rating: newsr,
                  location_rating: newlr,
                  furniture_rating: newftr,
                  wifi_rating: newwr,
                  overall_rating: newOveralRating,
                }
              );

              const addReview = Review.create({
                ReservationId: values.reservationID,
                HolidayHomeId: res[0].HolidayHome,
                ServiceNo: serviceNo,
                UserReview: values.review,
              });

              addReview.save();
            });
        }
      });

    res.status(200).json({ message: "Successfully added", success: true });
  } catch (err) {
    res.status(400).json({ message: "Internal Server Error" });
  }
};

// get user review
const getUserReview = async (req: Request, res: Response) => {
  res.status(200).json("get user details");
};

export { getHolidayHomesSorted, addUserReview, getUserReview };
