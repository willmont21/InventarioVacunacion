export class User {
	constructor(
		public id: number,
        public rol: string,
        public nombres: string,
        public apellidos: string,
        public email: string,
        public  password: string,
        public fechaNacimiento: string,
        public direccion: string,
        public celular: string,
        public vacuna: string,
        public tipoVacuna: string,
        public numeroDosis: number,
        public primeraDosis: string,
        public segundaDosis: string
	) { }
}