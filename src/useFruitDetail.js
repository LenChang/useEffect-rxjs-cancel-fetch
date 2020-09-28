import { useEffect, useState } from "react";
import { defer } from "rxjs";
import { getFruit } from "./api";

export const useFruitDetail = (fruitName) => {
  const [fruitDetail, setFruitDetail] = useState(null);

  useEffect(() => {
    if (!fruitName) {
      return;
    }

    // Method 1
    // getFruit(fruitName).then((data) => {
    //   console.log(data);
    //   setFruitDetail(data);
    // });

    // Method 2
    // getFruit(fruitName).then(setFruitDetail);

    // Method 3 Rxjs
    const subscription = defer(() => getFruit(fruitName)).subscribe(
      setFruitDetail
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [fruitName]);

  return fruitDetail;
};
