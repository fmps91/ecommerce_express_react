// User.js
class User {
    constructor(username, email, password, rol="cliente") {
        this.username = username;
        this.email = email;
        this.password = password;
        this.rol = rol;
    }

    // Validaciones
    isValid() {
        return this.username && this.email && this.password && this.rol;
    }

    isValidEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(this.email);
    }

    // Métodos para React (devuelven nuevos objetos para inmutabilidad)
    /* updateUsername(newUsername) {
        return new User(newUsername, this.email, this.password);
    }

    updateEmail(newEmail) {
        return new User(this.username, newEmail, this.password);
    }

    updatePassword(newPassword) {
        return new User(this.username, this.email, newPassword);
    } */

       

    // Convertir a objeto para estado o API
    toObject() {
        return {
            username: this.username,
            email: this.email,
            password: this.password
        };
    }

    // Método estático para crear desde objeto
    static fromObject(userData) {
        return new User(
            userData.username,
            userData.email,
            userData.password
        );
    }

    // Para formularios
    getFormData() {
        return {
            username: this.username || '',
            email: this.email || '',
            password: this.password || ''
        };
    }
}

export default User;