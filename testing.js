//Parent Sprit Classa
class Sprite {
    constructor(sprite_json, x, y, start_state){
        this.sprite_json = sprite_json;
        this.x = x;
        this.y = y;
        this.state = start_state;
        this.root_e = "TenderBud";

        this.cur_frame = 0;

        this.cur_bk_data = null;

        this.x_v = 20;
        this.y_v = 0;
        this.up_arrow = 38
        this.down_arrow = 40;
        this.left_arrow = 37;
        this.right_arrow = 39;
    }

    draw() {
        var ctx = canvas.getContext('2d');
        
        // Debugging
        console.log('Current state:', this.state);
        console.log('Current frame:', this.cur_frame);
        console.log('x:', this.x, 'y:', this.y);
        console.log('x velocity:', this.x_v, 'y velocity:', this.y_v);
    
        if (this.sprite_json[this.root_e][this.state][this.cur_frame]['img'] == null) {
            console.log('Loading image...');
            this.sprite_json[this.root_e][this.state][this.cur_frame]['img'] = new Image();
            this.sprite_json[this.root_e][this.state][this.cur_frame]['img'].src = 'spriteImages/Penguins/' + this.root_e + '/' + this.state + '/' + this.cur_frame + '.png';
        }
    
        if (this.cur_bk_data != null) {
            ctx.putImageData(this.cur_bk_data, (this.x - this.x_v), (this.y - this.y_v));
        }
        this.cur_bk_data = ctx.getImageData(this.x, this.y,
            this.sprite_json[this.root_e][this.state][this.cur_frame]['w'],
            this.sprite_json[this.root_e][this.state][this.cur_frame]['h']);
              
        ctx.drawImage(this.sprite_json[this.root_e][this.state][this.cur_frame]['img'], this.x, this.y);
            
        this.cur_frame = this.cur_frame + 1;
        if (this.cur_frame >= this.sprite_json[this.root_e][this.state].length) {
            console.log('Resetting frame count');
            this.cur_frame = 0;
        }
        if (this.x >= (window.innerWidth - this.sprite_json[this.root_e][this.state][this.cur_frame]['w'])) {
            console.log('Hit boundary: East');
            this.bound_hit('E');
    
        } else if (this.x <= 0) {
            console.log('Hit boundary: West');
            this.bound_hit('W');
        } else if (this.y >= (window.innerHeight - this.sprite_json[this.root_e][this.state][this.cur_frame]['h'])) {
            console.log('Hit boundary: South');
            this.bound_hit('S');
        } else if (this.y <= 0) {
            console.log('Hit boundary: North');
            this.bound_hit('N');
        } else {
            console.log('Moving sprite');
            this.x = this.x + this.x_v;
            this.y = this.y + this.y_v;
        }
        
    }
    

    handle_direction_change(keycode) {
        // local variables
        const velocity = 20; // Adjust as needed
        console.log('Key code pressed:', keycode);
    
        if (keycode == this.up_arrow) {
            console.log('Moving up');
            this.y_v = -velocity; // Set y velocity for upward movement
            this.x_v = 0; // Reset x velocity
            this.state = "walk_N";
        } else if (keycode == this.down_arrow) {
            console.log('Moving down');
            this.y_v = velocity; // Set y velocity for downward movement
            this.x_v = 0; // Reset x velocity
            this.state = "walk_S";
        } else if (keycode == this.left_arrow) {
            console.log('Moving left');
            this.x_v = -velocity; // Set x velocity for leftward movement
            this.y_v = 0; // Reset y velocity
            this.state = "walk_W";
        } else if (keycode == this.right_arrow) {
            console.log('Moving right');
            this.x_v = velocity; // Set x velocity for rightward movement
            this.y_v = 0; // Reset y velocity
            this.state = "walk_E";
        } else {
            // Handle other key presses (if needed)
        }
        this.draw()
        // If the direction has changed, stop the sprite at its current position
        this.cur_frame = 0;
    }
    
    
    
    
    

    set_idle_state(side){
        
        this.x_v = 0;
        this.y_v = 0;
        const idle_state = ["idle","idleBackAndForth","idleBreathing","idleFall","idleLayDown","idleLookAround","idleLookDown","idleLookLeft","idleLookRight","idleLookUp","idleSit","idleSpin","idleWave"];
    
        const random = Math.floor(Math.random() * idle_state.length);
        console.log(idle_state[random]);
        this.state = idle_state[random];
        
       
        if(side == 'E'){
            this.state = "walk_W";
            this.x_v = -20; // Adjust velocity for walking to the left
            this.y_v = 0;  // Reset y velocity
            this.x -=20 //move x by at least 1 position to not hit the bounds case again
        } else if(side == 'W'){
            console.log("need to walk east")
            this.state = "walk_E";
            this.x_v = 20; // Adjust velocity for walking to the right
            this.y_v = 0;  // Reset y velocity
            this.x +=20      //move x by at least 1 position to not hit the bounds case again
        } else if(side == 'N'){
            this.state = "walk_S";
            this.x_v = 0;  // Reset x velocity
            this.y_v = 20; // Adjust velocity for walking downward
            this.y +=20      //move y by at least 1 position to not hit the bounds case again
        } else if(side == 'S'){
            this.state = "walk_N";
            this.x_v = 0;  // Reset x velocity
            this.y_v = -20; // Adjust velocity for walking upward
            this.y -=20      //move y by at least 1 position to not hit the bounds case again
        }
        
       
        this.cur_frame = 0;
    
        // Reset velocities
        //this.x_v = 0;
        //this.y_v = 0;
    }
    
    bound_hit(side){
        this.set_idle_state(side);
   } 


}