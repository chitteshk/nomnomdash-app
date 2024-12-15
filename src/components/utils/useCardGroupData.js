import { useState, useEffect } from "react";

// Custom hook to fetch restaurant info and card group data
export const useCardGroupData = (resID) => {
  const [resInfo, setResInfo] = useState(null);
  const [cardGroups, setCardGroups] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await fetch(
          `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9352403&lng=77.624532&restaurantId=${resID}&catalog_qa=undefined&submitAction=ENTER`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        // Extracting relevant restaurant info and card groups
        const resInfo = data.data.cards.filter((item) => item.card?.card?.info);
        const relevantCards = data.data.cards.find((item) => item.groupedCard)
          ?.groupedCard?.cardGroupMap?.REGULAR?.cards;
        const cardGroups = relevantCards?.filter(({ card }) => card?.card?.title);

        // Update states
        setResInfo(resInfo);
        setCardGroups(cardGroups);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (resID) {
      fetchCardData(); // Only fetch if resID exists
    }
  }, [resID]); // Re-run when resID changes

  return { resInfo, cardGroups, loading, error }; // Return states to the component
};
