export interface Photo {
    img_src:    string,
    earth_date: string,
    rover:      Rover    
}

export interface Camera {
    name: string;
    full_name: string;

}    

export interface Rover{
    id:             number,
    name:           string,
    landing_date:   string,
    launch_date:    string,
    status:         string,
    max_sol:        number,
    max_date:       string,
    total_photos:   number,
    cameras:        Array<Camera>
} 