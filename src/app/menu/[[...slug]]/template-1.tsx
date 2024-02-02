import React from "react";

export default function Template1() {
  return (
    <section className="max-w-lg flex flex-col mx-auto bg-black h-svh">
      <h1 className="text-4xl text-white text-center mx-auto my-5">
        FOOD MENU
      </h1>

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
