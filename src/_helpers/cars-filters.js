import {cars} from "@/_store/car.module";
import moment from "moment-timezone/moment-timezone-utils";

export const carsFilters = {
    filterByName,
    filterByNation,
    filterByCategory,
    filterByBrand,
    lastUpdated,
    lastAdded,
}

function lastUpdated(n){
    return cars => {
        console.log(cars)
        cars.sort((a, b) => {
            let timeA = moment(a.UpdatedAt)
            let timeB = moment(b.UpdatedAt)
            return timeA.isBefore(timeB)
        })
        return cars.slice(0, n)
    }
}

function lastAdded(n){
    return cars => {
        cars.sort((a, b) => {
            let timeA = moment(a.CreatedAt)
            let timeB = moment(b.CreatedAt)
            return timeA.isBefore(timeB)
        })
        return cars.slice(0, n)
    }
}

function filterByNation(nation) {
    return cars => {
        let fCars = []
        cars.forEach(car => {
            if (car.Brand.Nation.Name === nation) {
                fCars.push(car)
            }
        })
        return fCars
    }
}

function filterByBrand(brand) {
    return cars => {
        let fCars = []
        cars.forEach(car => {
            if (car.Brand.Name === brand) {
                fCars.push(car)
            }
        })
        return fCars
    }
}

function filterByCategory(category) {
    return cars => {
        let fCars = []
        cars.forEach(car => {
            if (car.Categories) {
                if (car.Categories.some(e => e.Name === category)) {
                    fCars.push(car)
                }
            }
        })
        return fCars
    }
}

function filterByName(name) {
    return cars => {
        let fCars = []
        cars.forEach(car => {
            if (`${car.Brand.Name} ${car.ModelName}`.toLowerCase().includes(name.toLowerCase())) {
                fCars.push(car)
            }
        })
        return fCars
    }
}


