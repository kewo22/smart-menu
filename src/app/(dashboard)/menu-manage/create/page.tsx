"use client";
import React, { useEffect, useRef, useState } from "react";
import { ChevronRightIcon, Trash, ListPlus, Plus, Edit, Edit2, Eye, EyeOff, ExternalLinkIcon, Info, } from "lucide-react";
import { Template } from "@prisma/client";
import Image from "next/image";
import useSWR from "swr";

import { Fetcher } from "@/_lib/utils";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { table } from "console";
// import CreateMenuBtn from "./create-menu";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/_lib/utils";

type MenuItem = {
  category: string;
  items: {
    name: string;
    description: string;
    sizes: {
      s: number;
      m: number;
      l: number;
    };
  }[];
}

type Category = {
  id: number;
  category: string;
  isVisible: boolean;
}

type FoodItem = {
  id: number;
  foodItem: string;
  description: string;
  isVisible: boolean;
  prices: FoodItemPrice
  type: FoodType;
}

enum FoodType {
  VEG = "veg",
  NONVEG = "nonveg",
  VEGAN = "vegan",
  EGGETARIAN = "eggetarian",
}

type FoodItemPrice = {
  small: number;
  medium: number;
  large: number;
}

// const Categories: Category[] = [
//   {

//   }
// ]

export default function Page() {

  // const { data, error, isLoading } = useSWR<Template[]>(
  //   "/api/menu-template",
  //   Fetcher,
  //   {
  //     revalidateOnFocus: false,
  //   }
  // );
  const { toast } = useToast();


  const categoryEditingId = useRef<number>(-1);
  const foodItemEditingId = useRef<number>(-1);
  const categoryInputRef = useRef<HTMLInputElement | null>(null);
  const foodItemInputRef = useRef<HTMLInputElement | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);

  const [categoryInputValue, setCategoryInputValue] = useState<string>('');
  const [foodItemNameInputValue, setFoodItemNameInputValue] = useState<string>('');
  const [foodItemDescriptionInputValue, setFoodItemDescriptionInputValue] = useState<string>('');

  const [smallPrice, setSmallPrice] = useState<number>(0);
  const [mediumPrice, setMediumPrice] = useState<number>(0);
  const [largePrice, setLargePrice] = useState<number>(0);

  const onCategoryKyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const categoriesClone = [...categories];
      const isAlreadyAddedIndex = categoriesClone.findIndex(item => item.category.toLocaleLowerCase().replace(/\s/g, '') === categoryInputValue.toLocaleLowerCase().replace(/\s/g, ''))
      console.log("🚀 ~ onCategoryKyDown ~ isAlreadyAddedIndex:", isAlreadyAddedIndex)

      if (isAlreadyAddedIndex === -1) {
        categoriesClone.push({
          category: e.currentTarget.value,
          id: Math.random(),
          isVisible: true
        });
      } else {
        // alert('already exists')
        toast({
          className: cn(
            "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
          ),
          title: "Oops..!",
          description: `Category ${categoryInputValue.toUpperCase()} already added`,
          variant: "primary",
        });
      }
      setCategories([...categoriesClone]);
      setCategoryInputValue('')
    }
  }

  const onEditCategoryClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>, index: number) => {
    e.stopPropagation();
    categoryInputRef.current?.focus();
    categoryEditingId.current = index;
    setCategoryInputValue(categories[index].category);
  }

  const onDeleteCategoryClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>, index: number) => {
    e.stopPropagation();
    const categoriesClone = [...categories];
    categoriesClone.splice(index, 1);
    setCategories([...categoriesClone]);
  }

  const onCategoryToggleVisibility = (e: React.MouseEvent<SVGSVGElement, MouseEvent>, index: number) => {
    e.stopPropagation();
    const categoriesClone = [...categories];
    categoriesClone[index] = {
      ...categoriesClone[index],
      isVisible: !categoriesClone[index].isVisible
    }
    setCategories([...categoriesClone]);
  }

  const onCategoryClick = (index: number) => {
    console.log('onCategoryClick --- >', categories[index])
    setSelectedCategory(categories[index])
  }

  // FOODS
  const onSmallFoodItemKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const isNumEntered = /^\d$/.test(e.key);
    const len = (e.target as HTMLInputElement).value.length;
    if (isNumEntered && len === 5) e.preventDefault();
  }

  const onMediumFoodItemKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const isNumEntered = /^\d$/.test(e.key);
    const len = (e.target as HTMLInputElement).value.length;
    if (isNumEntered && len === 5) e.preventDefault()
  }

  const onLargeFoodItemKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const isNumEntered = /^\d$/.test(e.key);
    const len = (e.target as HTMLInputElement).value.length;
    if (isNumEntered && len === 5) e.preventDefault()
  }

  const onEditFoodItemClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>, index: number) => {
    e.stopPropagation();
    foodItemInputRef.current?.focus();
    foodItemEditingId.current = index;
    setFoodItemNameInputValue(foodItems[index].foodItem);
    setFoodItemDescriptionInputValue(foodItems[index].description);
    setSmallPrice(foodItems[index].prices.small);
    setMediumPrice(foodItems[index].prices.medium);
    setLargePrice(foodItems[index].prices.large);
  }

  const onFoodItemToggleVisibility = (e: React.MouseEvent<SVGSVGElement, MouseEvent>, index: number) => {
    e.stopPropagation();
    const foodItemsClone = [...foodItems];
    foodItemsClone[index] = {
      ...foodItemsClone[index],
      isVisible: !foodItemsClone[index].isVisible
    }
    setFoodItems([...foodItemsClone]);
  }

  const onDeleteFoodItemClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>, index: number) => {
    e.stopPropagation();
    const foodItemsClone = [...foodItems];
    foodItemsClone.splice(index, 1);
    setFoodItems([...foodItemsClone]);
  }

  const onFoodItemKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') processFoodItemValues();
  }

  const onFoodItemDescriptionKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') processFoodItemValues();
  }

  const onSmallFoodItemPriceKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') processFoodItemValues();
  }

  const onMediumFoodItemPriceKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') processFoodItemValues();
  }

  const onLargeFoodItemPriceKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') processFoodItemValues();
  }

  const processFoodItemValues = () => {
    if (!foodItemNameInputValue) return;
    const foodItemsClone = [...foodItems];
    const isAlreadyAddedIndex = foodItemsClone.findIndex(item => item.foodItem.toLocaleLowerCase().replace(/\s/g, '') === foodItemNameInputValue.toLocaleLowerCase().replace(/\s/g, ''))
    if (isAlreadyAddedIndex === -1) {
      foodItemsClone.push({
        foodItem: foodItemNameInputValue,
        description: foodItemDescriptionInputValue,
        id: Math.random(),
        isVisible: true,
        type: foodTypeValue,
        prices:
        {
          large: largePrice || 0,
          medium: mediumPrice || 0,
          small: smallPrice || 0
        }

      });
      setFoodItems([...foodItemsClone]);
    } else {
      const updatedFoodItem: FoodItem = {
        foodItem: foodItemNameInputValue,
        description: foodItemDescriptionInputValue,
        id: Math.random(),
        isVisible: true,
        type: foodTypeValue,
        prices:
        {
          large: largePrice || foodItemsClone[isAlreadyAddedIndex].prices.large,
          medium: mediumPrice || foodItemsClone[isAlreadyAddedIndex].prices.medium,
          small: smallPrice || foodItemsClone[isAlreadyAddedIndex].prices.small
        }

      }
      foodItemsClone.splice(isAlreadyAddedIndex, 1, updatedFoodItem)
      setFoodItems([...foodItemsClone]);
    }
    setFoodItemNameInputValue('');
    setFoodItemDescriptionInputValue('');
    setSmallPrice(0);
    setMediumPrice(0);
    setLargePrice(0);
  }

  const [foodTypeValue, setFoodTypeValue] = useState<FoodType>(FoodType.VEG);

  const handleRadioChange = (value: FoodType) => {
    setFoodTypeValue(value);
  };

  return (
    <div className="h-full overflow-hidden flex flex-col gap-5">
      <h2 className="flex items-center text-sm">
        <span>Menu Management</span>
        <ChevronRightIcon className="h-3" />
        <span>Create Menu</span>
      </h2>

      <div className="flex flex-row gap-2 flex-grow overflow-hidden">

        {/*  */}
        <div className="flex-[0_1_220px] border h-full rounded p-2 flex flex-col gap-5">
          <div className="relative flex flex-col gap-2">
            <p className="font-semibold select-none">Categories</p>
            <input ref={categoryInputRef} value={categoryInputValue} onChange={e => setCategoryInputValue(e.target.value)} type="text" className="outline-none border rounded flex-grow p-2 pr-8 w-full" placeholder="Eg: Chicken" autoComplete="off" spellCheck={true} onKeyUp={(e) => { onCategoryKyDown(e) }} />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild className="absolute right-2.5 bottom-2.5 opacity-50 hover:opacity-100">
                  <Info className="size-4" />
                </TooltipTrigger>
                <TooltipContent>
                  <span className="text-xs">Press &#8629; (enter key) to add category</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <ul>
            {
              categories.map((category, index) => {
                return (
                  <li key={`category-${index}`} className="group flex flex-row items-center justify-between my-2 first:mt-0 last:mb-0 bg-slate-100 p-2 rounded" role="button" onClick={() => { onCategoryClick(index) }}>
                    <span className="capitalize">{category.category}</span>
                    <div className="flex flex-row invisible group-hover:visible">
                      <Edit2 className="h-3" role="button" onClick={(e) => { onEditCategoryClick(e, index) }} />
                      {
                        category.isVisible ? <Eye className="h-3" role="button" onClick={(e) => { onCategoryToggleVisibility(e, index) }} /> : <EyeOff className="h-3" role="button" onClick={(e) => { onCategoryToggleVisibility(e, index) }} />
                      }
                      <Trash className="h-3" role="button" onClick={(e) => { onDeleteCategoryClick(e, index) }} />
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </div>

        {/*  */}
        <div className="flex-[0_1_280px] border h-full rounded p-2 flex flex-col gap-5 overflow-hidden">
          <div className="flex flex-col gap-2">
            <div className="relative flex flex-col gap-2">
              <p className="font-semibold select-none">Food item
                {
                  selectedCategory && <span>({selectedCategory?.category})</span>
                }

              </p>
              <input ref={foodItemInputRef} value={foodItemNameInputValue} onChange={e => setFoodItemNameInputValue(e.target.value)} type="text" className="outline-none border rounded flex-grow p-2 pr-8 w-full" placeholder="Eg: Deviled Chicken" autoComplete="off" spellCheck={true} onKeyUp={(e) => { onFoodItemKeyDown(e) }} />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild className="absolute right-2.5 top-1 opacity-50 hover:opacity-100">
                    <Info className="size-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <span className="text-xs">Press &#8629; (enter key) to add food item</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div>
              <textarea value={foodItemDescriptionInputValue} onChange={e => setFoodItemDescriptionInputValue(e.target.value)} onKeyUp={(e) => { onFoodItemDescriptionKeyDown(e) }} className="outline-none border rounded flex-grow p-2 pr-8 w-full" placeholder="Eg: Tenderly oven roasted spicy deviled chicken" rows={3}></textarea>
            </div>
            <div className="flex flex-row justify-between items-center gap-2">
              <div className="relative max-w-[90px]">
                <span className="absolute h-full w-7 font-semibold grid place-items-center bg-slate-200 select-none">S</span>
                <input type="number" value={smallPrice} onChange={e => setSmallPrice(+e.target.value)} className="outline-none border rounded p-2 text-right w-full" onKeyDown={(e) => { onSmallFoodItemKeyDown(e) }} onKeyUp={(e) => { onSmallFoodItemPriceKeyUp(e) }} />
              </div>
              <div className="relative max-w-[90px]">
                <span className="absolute h-full w-7 font-semibold grid place-items-center bg-slate-200 select-none">M</span>
                <input type="number" value={mediumPrice} onChange={e => setMediumPrice(+e.target.value)} className="outline-none border rounded p-2 text-right w-full" onKeyDown={(e) => { onMediumFoodItemKeyDown(e) }} onKeyUp={(e) => { onMediumFoodItemPriceKeyUp(e) }} />
              </div>
              <div className="relative max-w-[90px]">
                <span className="absolute h-full w-7 font-semibold grid place-items-center bg-slate-200 select-none">L</span>
                <input type="number" value={largePrice} onChange={e => setLargePrice(+e.target.value)} className="outline-none border rounded p-2 text-right w-full" onKeyDown={(e) => { onLargeFoodItemKeyDown(e) }} onKeyUp={(e) => { onLargeFoodItemPriceKeyUp(e) }} />
              </div>
            </div>

            <div className="grid grid-cols-2 grid-rows-2 gap-y-1 gap-x-2">
              <div className="flex flex-row items-center justify-between">
                <label className="text-sm select-none">Veg</label>
                <input type="radio" value="veg" checked={foodTypeValue === "veg"} onChange={() => handleRadioChange(FoodType.VEG)} />
              </div>
              <div className="flex flex-row items-center justify-between">
                <label className="text-sm select-none">Non-Veg</label>
                <input type="radio" value="nonveg" checked={foodTypeValue === "nonveg"} onChange={() => handleRadioChange(FoodType.NONVEG)} />
              </div>
              <div className="flex flex-row items-center justify-between">
                <label className="text-sm select-none">Vegan</label>
                <input type="radio" value="vegan" checked={foodTypeValue === "vegan"} onChange={() => handleRadioChange(FoodType.VEGAN)} />
              </div>
              <div className="flex flex-row items-center justify-between">
                <label className="text-sm select-none">Eggetarian</label>
                <input type="radio" value="eggetarian" checked={foodTypeValue === "eggetarian"} onChange={() => handleRadioChange(FoodType.EGGETARIAN)} />
              </div>
            </div>

          </div>

          <ul className="flex-grow overflow-auto">
            {
              foodItems.map((foodItem, index) => {
                return (
                  <li key={`food-item-${index}`} className="group flex flex-col gap-2 my-2 first:mt-0 last:mb-0 bg-slate-100 p-2 rounded" role="button" onClick={() => { onCategoryClick(index) }}>
                    <div className="flex flex-row items-center justify-between">
                      <span className="capitalize">{foodItem.foodItem} - {foodItem.type}</span>
                      <div className="flex flex-row invisible group-hover:visible">
                        <Edit2 className="h-3" role="button" onClick={(e) => { onEditFoodItemClick(e, index) }} />
                        {
                          foodItem.isVisible ? <Eye className="h-3" role="button" onClick={(e) => { onFoodItemToggleVisibility(e, index) }} /> : <EyeOff className="h-3" role="button" onClick={(e) => { onFoodItemToggleVisibility(e, index) }} />
                        }
                        <Trash className="h-3" role="button" onClick={(e) => { onDeleteFoodItemClick(e, index) }} />
                      </div>
                    </div>

                    {/* w-[246px] truncate */}
                    <p className="">{foodItem.description}</p>

                    <div className="flex flex-row justify-between gap-2">
                      <div>
                        sm - {foodItem.prices.small}
                      </div>
                      <div>
                        md - {foodItem.prices.medium}
                      </div>
                      <div>
                        lg - {foodItem.prices.large}
                      </div>
                    </div>
                  </li>
                )
              })
            }
          </ul>

        </div>

        {/*  */}
        <div className="flex-[0_1_200px] border h-full rounded p-2">3</div>

        {/*  */}
        <div className="flex-auto border h-full rounded p-2 overflow-y-auto">
          w
        </div>
      </div>
    </div>
  );
}