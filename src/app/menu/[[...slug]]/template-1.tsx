import React from "react";

type Template1Props = {
  menuObj: any;
};

export default function Template1(props: Template1Props) {
  console.log("🚀 ~ Template1 ~ props:", props.menuObj);
  // console.log("🚀 ~ Template1 ~ props:", Object.values(props.menuObj));
  const arr: any[] = Object.values(props.menuObj);
  console.log("🚀 ~ Template1 ~ arr:", arr);
  return (
    // max-w-lg
    <section className=" flex flex-col mx-auto bg-black h-svh">
      <h1 className="text-4xl text-white text-center mx-auto my-5">
        FOOD MENU
      </h1>

      {arr.map((item, i) => {
        return (
          <div key={i} className="text-white">
            <div>{item.category}</div>
            <div>
              {item.items.map((d: any, i: number) => {
                return (
                  <div key={i}>
                    {d.name} - {d.price}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <div className="bg-orange-500 text-white w-fit px-3 py-1 rounded-md font-bold mb-2 mx-5">
        MAIN COURSE
      </div>
      <table className="text-white mx-5">
        <tbody>
          <tr>
            <td>Cheese Burger</td>
            <td>$40</td>
          </tr>
          <tr>
            <td>Cheese Sandwich</td>
            <td>$40</td>
          </tr>
          <tr>
            <td>Spicy Chicken</td>
            <td>$40</td>
          </tr>
          <tr>
            <td>Hotdog</td>
            <td>$40</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
