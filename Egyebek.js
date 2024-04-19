// Jatsza le, ha billentyut nyomnak, vagy kattintanak
window.addEventListener('keydown', allowMusic);
window.addEventListener('click', allowMusic);

function allowMusic() {
    const audio = new Audio('./media/musictest.mp3');
    audio.loop = true;
    audio.play();

    // Hogy csak a legelso interakciora jattsza le
    window.removeEventListener('keydown', allowMusic);
    window.removeEventListener('click', allowMusic);
}

function utkozik(
                    {
                        object1,
                        object2
                    })
{
    return (object1.pozicio.y  + object1.height        >= object2.pozicio.y   //Laba eri
        &&  object1.pozicio.y  <= object2.pozicio.y   + object2.height        //Feje eri
        &&  object1.pozicio.x  <= object2.pozicio.x   + object2.width         //Balrol eri
        &&  object1.pozicio.x  + object1.width         >= object2.pozicio.x)  //Jobbrol eri (1 a 2t)
}

function falElemmelUtkozik(
                            {
                                object1,
                                object2
                            })
{
            return (object1.pozicio.y  + object1.height        >= object2.pozicio.y
                &&  object1.pozicio.y  + object1.height        <= object2.pozicio.y   + object2.height
                &&  object1.pozicio.x  <= object2.pozicio.x   + object2.width
                &&  object1.pozicio.x  + object1.width         >= object2.pozicio.x)
}