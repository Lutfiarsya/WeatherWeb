export const dataCuaca = (main) => {
    const api =  `https://api.openweathermap.org/data/2.5/${main}&units=imperial&appid=a55bca5aaf89dd7973d4234b37a9a385`;
    return api
}

export const maps = () => {
    const maps =  'https://tile.openweathermap.org/map/pressure_new/0/0/0.png?appid=a55bca5aaf89dd7973d4234b37a9a385'
    return maps;
}

