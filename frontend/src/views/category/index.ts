import type { ComponentType } from "react";
import FashionClothingPage from "./FashionClothingPage";
import ElectronicsGadgetsPage from "./ElectronicsGadgetsPage";
import BeautyPersonalCarePage from "./BeautyPersonalCarePage";
import HomeKitchenPage from "./HomeKitchenPage";
import GroceryFoodPage from "./GroceryFoodPage";
import BabyKidsToysPage from "./BabyKidsToysPage";
import BooksStationeryPage from "./BooksStationeryPage";
import SportsFitnessPage from "./SportsFitnessPage";
import WatchesJewelryPage from "./WatchesJewelryPage";
import HomeAppliancesFurniturePage from "./HomeAppliancesFurniturePage";

/** Category slug -> its own landing page design. */
export const CATEGORY_PAGES: Record<string, ComponentType> = {
  "fashion-clothing": FashionClothingPage,
  "electronics-gadgets": ElectronicsGadgetsPage,
  "beauty-personal-care": BeautyPersonalCarePage,
  "home-kitchen": HomeKitchenPage,
  "grocery-food": GroceryFoodPage,
  "baby-kids-toys": BabyKidsToysPage,
  "books-stationery-office-supplies": BooksStationeryPage,
  "sports-fitness-outdoor": SportsFitnessPage,
  "watches-jewelry-accessories": WatchesJewelryPage,
  "home-appliances-furniture": HomeAppliancesFurniturePage,
};
