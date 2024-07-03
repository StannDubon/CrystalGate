class Validator {
    static filename = null;
    static searchValue = null;
    static passwordError = null;
    static fileError = null;
    static searchError = null;

    static getPasswordError() {
        return this.passwordError;
    }

    static getFilename() {
        return this.filename;
    }

    static getFileError() {
        return this.fileError;
    }

    static getSearchValue() {
        return this.searchValue;
    }

    static getSearchError() {
        return this.searchError;
    }

    static validateForm(fields) {
        return fields.map(value => value.trim());
    }

    static validateNaturalNumber(value) {
        const number = Number(value);
        return Number.isInteger(number) && number >= 1;
    }

    static validateImageFile(file, dimension) {
        if (file && file.size && file.type) {
            const validMimeTypes = ['image/jpeg', 'image/png'];
            if (file.size > 2097152) {
                this.fileError = 'El tamaño de la imagen debe ser menor a 2MB';
                return false;
            } else if (file.width < dimension) {
                this.fileError = 'La dimensión de la imagen es menor a ' + dimension + 'px';
                return false;
            } else if (validMimeTypes.includes(file.type)) {
                const extension = file.name.split('.').pop().toLowerCase();
                this.filename = `${Date.now()}.${extension}`;
                return true;
            } else {
                this.fileError = 'El tipo de imagen debe ser jpg o png';
                return false;
            }
        } else {
            return false;
        }
    }

    static validateEmail(value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    }

    static validateBoolean(value) {
        if (typeof value === 'boolean') {
            return true;
        } else if (typeof value === 'number') {
            return value === 0 || value === 1;
        } else if (typeof value === 'string') {
            const lowerValue = value.toLowerCase();
            return lowerValue === 'true' || lowerValue === 'false';
        }
        return false;
    }

    static validateString(value) {
        const regex = /^[a-zA-Z0-9ñÑáÁéÉíÍóÓúÚ\s,;.]+$/;
        return regex.test(value);
    }

    static validateAlphabetic(value) {
        const regex = /^[a-zA-ZñÑáÁéÉíÍóÓúÚ\s]+$/;
        return regex.test(value);
    }

    static validateAlphanumeric(value) {
        const regex = /^[a-zA-Z0-9ñÑáÁéÉíÍóÓúÚ\s]+$/;
        return regex.test(value);
    }

    static validateLength(value, min, max) {
        return value.length >= min && value.length <= max;
    }

    static validateMoney(value) {
        const regex = /^[0-9]+(?:\.[0-9]{1,2})?$/;
        return regex.test(value);
    }

    static validatePassword(value) {
        if (value.length < 8) {
            this.passwordError = 'La contraseña es menor a 8 caracteres';
            return false;
        } else if (value.length <= 72) {
            return true;
        } else {
            this.passwordError = 'La contraseña es mayor a 72 caracteres';
            return false;
        }
    }

    static validateDUI(value) {
        const regex = /^[0-9]{8}-[0-9]{1}$/;
        return regex.test(value);
    }

    static validatePhone(value) {
        const regex = /^[2,6,7][0-9]{3}-[0-9]{4}$/;
        return regex.test(value);
    }

    static validateDateTime(value) {
        const dateTime = new Date(value);
        return !isNaN(dateTime.getTime()) && value === dateTime.toISOString().slice(0, 19).replace('T', ' ');
    }

    static validateDate(value) {
        const [year, month, day] = value.split('-').map(Number);
        const date = new Date(year, month - 1, day);
        return date.getFullYear() === year && date.getMonth() + 1 === month && date.getDate() === day;
    }

    static validateTime(value) {
        const regex = /^(?:2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/;
        return regex.test(value);
    }

    static validateSearch(value) {
        const trimmedValue = value.trim();
        if (trimmedValue === '') {
            this.searchError = 'Ingrese un valor para buscar';
            return false;
        } else if (trimmedValue.split(/\s+/).length > 3) {
            this.searchError = 'La búsqueda contiene más de 3 palabras';
            return false;
        } else if (this.validateString(trimmedValue)) {
            this.searchValue = trimmedValue;
            return true;
        } else {
            this.searchError = 'La búsqueda contiene caracteres prohibidos';
            return false;
        }
    }
}
