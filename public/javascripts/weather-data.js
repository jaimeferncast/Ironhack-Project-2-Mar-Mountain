let dataTable

function populateAll(data) {

    populateTableWithDates(data)
    populateTableWithTemp(data)
    populateTableWithClouds(data)
    populateTableWithRain(data)
    populateTableWithSnow(data)
    populateTableWithWaterTemp(data)
    populateTableWithWaveDirection(data)
    populateTableWithWaves(data)
    populateTableWithWavePeriod(data)
    populateTableWithWindDirection(data)
    populateTableWithWindSpeed(data)
    populateTableWithWindGusts(data)
}

function populateTableWithDates(array) {
    let grey = '225'
    array.forEach((elm, i) => {
        if (!(i % 3)) {
            if (!(i % 24)) { grey === '243' ? grey = '225' : grey = '243' }     // cambia el tono de gris al pasar al día siguiente

            const time = new Date(elm.time.slice(0, 19))
            let day = time.getDay()
            switch (day) {
                case 0: day = 'D'; break
                case 1: day = 'L'; break
                case 2: day = 'M'; break
                case 3: day = 'X'; break
                case 4: day = 'J'; break
                case 5: day = 'V'; break
                case 6: day = 'S'; break
            }
            const date = time.getDate()
            const hours = time.getHours() + 'h'

            dataTable += `<th style="background-color: rgb(${grey}, ${grey}, ${grey});">${day}<br>${date}<br>${hours}</th>`
        }
    })
}

function populateTableWithTemp(array) {
    dataTable += `</tr></thead><tbody><tr>`     // elementos de la tabla entre thead y tbody
    array.forEach((elm, i) => {
        if (!(i % 3)) {
            let backgroundColor
            if (elm.airTemperature.sg < -20) { backgroundColor = '360' }
            else if (elm.airTemperature.sg > 50) { backgroundColor = '0' }
            else { backgroundColor = Math.round(360 - ((elm.airTemperature.sg + 20) / 70 * 360)) }  // Queremos un color entre hsl(0,100%,60%) --20ºC- y hsl(360,100%,60%) -+50ºC-
            const Temp = Math.round(elm.airTemperature.sg)
            dataTable += `<td style="background-color: hsl(${backgroundColor},100%,60%);">${Temp}</td>`
        }
    })
}

function populateTableWithClouds(array) {
    dataTable += `</tr><tr>`     // elementos de la tabla entre rows de datos
    array.forEach((elm, i) => {
        if (!(i % 3)) {
            const alpha = elm.cloudCover.sg / 100
            if (elm.cloudCover.sg > 1) { cloudCover = Math.round(elm.cloudCover.sg) }
            else { cloudCover = '' }
            dataTable += `<td style="background-color: rgba(90,90,90,${alpha});">${cloudCover}</td>`
        }
    })
}

function populateTableWithRain(array) {
    dataTable += `</tr><tr>`     // elementos de la tabla entre rows de datos
    array.forEach((elm, i) => {
        if (!(i % 3)) {
            if (elm.precipitation.sg >= 0.1) { precipitation = elm.precipitation.sg.toFixed(1) }
            else { precipitation = ' ' }
            dataTable += `<td>${precipitation}</td>`
        }
    })
}

function populateTableWithSnow(array) {
    dataTable += `</tr><tr>`     // elementos de la tabla entre rows de datos
    array.forEach((elm, i) => {
        if (!(i % 3)) {
            let snowDepth
            if (elm.snowDepth) {
                (elm.snowDepth.sg > 0) ? snowDepth = elm.snowDepth.sg.toFixed(1) : snowDepth = ' '
            } else { snowDepth = ' ' }
            dataTable += `<td>${snowDepth}</td>`
        }
    })
}

function populateTableWithWaterTemp(array) {
    dataTable += `</tr><tr>`     // elementos de la tabla entre rows de datos
    array.forEach((elm, i) => {
        if (!(i % 3)) {
            let backgroundColor = Math.round(360 - ((elm.waterTemperature.sg) + 30 / 60 * 360))
            const Temp = Math.round(elm.waterTemperature.sg)
            dataTable += `<td style="background-color: hsl(${backgroundColor},100%,80%);">${Temp}</td>`
        }
    })
}

function populateTableWithWaveDirection(array) {
    dataTable += `</tr><tr>`     // elementos de la tabla entre rows de datos
    array.forEach((elm, i) => {
        if (!(i % 3)) {
            let waveDirection
            if (elm.waveDirection) {
                waveDirection = Math.round(elm.waveDirection.sg)
                dataTable += `<td><img src="https://upload.wikimedia.org/wikipedia/en/f/f1/Down_Arrow_Icon.png" alt="arrow" style="width: 22px; height: 17px; transform: rotate( ${waveDirection}deg ); image-rendering: -webkit-optimize-contrast; filter: invert(1) saturate(100) hue-rotate(520deg);"></td>`
            } else { dataTable += `<td> </td>` }
        }
    })
}

function populateTableWithWaves(array) {
    dataTable += `</tr><tr>`     // elementos de la tabla entre rows de datos
    array.forEach((elm, i) => {
        if (!(i % 3)) {
            let waveHeight
            let alpha
            if (elm.waveHeight) {
                alpha = elm.waveHeight.sg / 10
                waveHeight = elm.waveHeight.sg.toFixed(1)
            } else { waveHeight = ' ' }
            dataTable += `<td style="background-color: rgba(41,41,255,${alpha});">${waveHeight}</td>`
        }
    })
}

function populateTableWithWavePeriod(array) {
    dataTable += `</tr><tr>`     // elementos de la tabla entre rows de datos
    array.forEach((elm, i) => {
        if (!(i % 3)) {
            let wavePeriod
            elm.wavePeriod ? wavePeriod = Math.round(elm.wavePeriod.sg) : wavePeriod = ' '
            dataTable += `<td>${wavePeriod}</td>`
        }
    })
}

function populateTableWithWindDirection(array) {
    dataTable += `</tr><tr>`     // elementos de la tabla entre rows de datos
    array.forEach((elm, i) => {
        if (!(i % 3)) {
            let windDirection
            if (elm.windDirection) {
                windDirection = Math.round(elm.windDirection.sg)
                dataTable += `<td><img src="https://upload.wikimedia.org/wikipedia/en/f/f1/Down_Arrow_Icon.png" alt="arrow" style="width: 22px; height: 17px; transform: rotate( ${windDirection}deg ); image-rendering: -webkit-optimize-contrast; filter: invert(1) saturate(100) hue-rotate(400deg);"></td>`
            }   // para todos los "wave" parametros solo existen datos a 7 días vista y sólo en puntos costeros
        }
    })
}

function populateTableWithWindSpeed(array) {
    dataTable += `</tr><tr>`     // elementos de la tabla entre rows de datos
    array.forEach((elm, i) => {
        if (!(i % 3)) {
            const alpha = elm.windSpeed.sg * 3.6 / 100 + 0.1
            let windSpeed = Math.round(elm.windSpeed.sg * 3.6)
            dataTable += `<td style="background-color: rgba(167,26,255,${alpha});">${windSpeed}</td>`
        }
    })
}

function populateTableWithWindGusts(array) {
    dataTable += `</tr><tr>`     // elementos de la tabla entre rows de datos
    array.forEach((elm, i) => {
        if (!(i % 3)) {
            const alpha = elm.gust.sg * 3.6 / 100 + 0.1
            let gust = Math.round(elm.gust.sg * 3.6)
            dataTable += `<td style="background-color: rgba(204,0,184,${alpha});">${gust}</td>`
        }
    })
}