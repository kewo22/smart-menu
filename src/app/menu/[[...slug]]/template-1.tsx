import React from "react";

type Template1Props = {
  menuObj: any;
};

export default function Template1(props: Template1Props) {
  const arr: any[] = Object.values(props.menuObj);

  return (
    // max-w-lg
    <section className=" flex flex-col mx-auto bg-black h-svh">
      <h1 className="text-4xl text-white text-center mx-auto my-5">
        FOOD MENU
      </h1>

      <div className="flex flex-col gap-5">
        {arr.map((item, i) => {
          return (
            <div key={i} className="text-white flex flex-col gap-1">
              <div className="bg-orange-500 text-white w-fit px-3 py-1 rounded-md font-bold mb-2 mx-5">
                {item.category}
              </div>
              <div className="mx-5">
                <table className="text-white w-full">
                  <tbody>
                    {item.items.map((d: any, i: number) => {
                      return (
                        <tr key={i}>
                          <td>{d.name}</td>
                          <td className="text-right">{d.price}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
