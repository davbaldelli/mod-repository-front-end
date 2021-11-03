export class CarsFilters {
    static filterByNation(nation) {
        return cars => {
            let fCars = []
            cars.forEach(car => {
                if(car.Brand.Nation.Name === nation){
                    fCars.push(car)
                }
            })
            return fCars
        }
    }
    static filterByBrand(brand){
        return cars => {
            let fCars = []
            cars.forEach(car => {
                if(car.Brand.Name === brand){
                    fCars.push(car)
                }
            })
            return fCars
        }
    }

    static filterByCategory(category) {
        return cars => {
            let fCars = []
            cars.forEach(car => {
                if(car.Categories) {
                    if (car.Categories.some(e => e.Name === category)) {
                        fCars.push(car)
                    }
                }
            })
            return fCars
        }
    }

    static filterByName(name) {
        return cars => {
            let fCars = []
            cars.forEach(car => {
                if (`${car.Brand.Name} ${car.ModelName}`.toLowerCase().includes(name.toLowerCase())){
                    fCars.push(car)
                }
            })
            return fCars
        }
    }

}

