export const dataCuaca = (location) => {
    return `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=a55bca5aaf89dd7973d4234b37a9a385`;
}

export const forecastApi = (id) => {
    return `http://api.openweathermap.org/data/2.5/forecast?id=${id}&units=imperial&appid=a55bca5aaf89dd7973d4234b37a9a385`
}