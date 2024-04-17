const canvas = document.querySelector("canvas");
    const sprites_to_draw = new Array(2); 
    var draw_loop_timeout;
    var img = new Image();
    
    sprites_to_draw[0] = new Array(0); //background and 
    sprites_to_draw[1] = new Array(0); //forground
    $.getJSON( "spriteImages/Penguins/animationData.json", function( data ) {
        //sprites_to_draw[1].push( new Sprite(data, 0 ,0, "idleSpin") );
        //sprites_to_draw[1].push( new Sprite(data, 100 ,100, "idleWave") );
        sprites_to_draw[1].push( new Sprite(data, 150 ,600, "walk_E") );

    });


    $( document ).ready(function() {
        console.log( "Page is now ready" );
        resize();

        img.onload = function() {
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.src = 'imgs/bk.jpg';
        draw_loop_timeout = setInterval(draw_loop, 33);
    });

    window.addEventListener('resize', resize);

    function draw_loop(){
        
        var background_length = sprites_to_draw[0].length;
        var forground_length  = sprites_to_draw[1].length;
        const context = canvas.getContext('2d');
        //context.clearRect(0, 0, canvas.width, canvas.height);

        //Draw background sprites
        for(var i = 0; i < background_length; i++){
            sprites_to_draw[0][i].draw();
        }

        //Draw forground sprites
        for(var i = 0; i < forground_length; i++){
            sprites_to_draw[1][i].draw();
        }
    }

    function resize(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

    }