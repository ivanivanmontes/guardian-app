import React, { createContext, useContext, useState} from "react";

const CoordinateContext = createContext();

export const useCoordinates = () => {
    return useContext(CoordinateContext);
}

export const CoordinateProvider = ({ children }) => {
    const [coordinates, setCoordinates] = useState(null);
    const setCoords = (coords) => {
        setCoordinates(coords);
    }

    return (
        <CoordinateContext.Provider value={{coordinates, setCoords}}>

            {children}
        </CoordinateContext.Provider>
    );
};

