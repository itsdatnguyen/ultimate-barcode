export namespace Utility{

    /**
     * Clamps a number based on a minimum and maximum parameter.
     * @param value The value to clamp.
     * @param min The minimum clamp value. This is returned if the value is less then min.
     * @param max The maximum clamp value. This is returned if the value is more than max.
     */
    export function clamp(value: number, min: number, max: number): number {
        if (value < min) {
            return min;
        }
        else if (value > max) {
            return max;
        }
        else {
            return value;
        }
    }

    /**
     * Returns a random integer between givin parameters. The maximum is exclusive and the minimum is inclusive
     * @param min inclusive minimum
     * @param max exclusive minimum
     */
    export function getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; 
    }

    export function toPascalCase(value: string): string {
        return capitalize(value.toLowerCase());
    }

    export function capitalize(value: string): string {
        if (value) {
            return value.charAt(0).toUpperCase() + value.slice(1);
        }
        return value;
    }

    export function setCharAt(str: string, index: number, chr: string): string {
        if (index > str.length - 1){
            return str;
        } 
        else {
            return str.substr(0, index) + chr + str.substr(index + 1);
        }
    }

    
    /**
     * Only valid for YYYY/MM/DD format
     * @param time 
     * @param years 
     */
    export function modifyYears(time: string, years: number): string {
        let newYear = Number.parseInt(time.substr(0, 4)) + years;
        return newYear.toString() + time.substr(4, 20);
    }
}