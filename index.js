var hatterSzin = 'red';
document.body.style.background = hatterSzin;


const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1920
canvas.height = 1024

let nagyitasiArany = 2 //355/113
let stopper = 0

const meretaranyositottCanvas =
{
    width:  canvas.width / nagyitasiArany,
    height: canvas.height / nagyitasiArany,
}

const falElemekTombositve = []                          //Nem jo formatumban exportal a kulso program, amivel a falelemek helyet hataroztam meg
for (let i = 0; i < falElemek.length; i += 160)
{
    falElemekTombositve.push(falElemek.slice(i, i+160))
}

const peldanyositottFalElemek = []                      //Ezeken nem lehet athatolni
falElemekTombositve.forEach((sor, y) =>
{
    sor.forEach((karakter, x) =>
    {
        if(karakter === 1)
        {
            peldanyositottFalElemek.push(new FalElem(
                                                    {
                                                        pozicio:
                                                                {
                                                                   x: x*12,
                                                                   y: y*12,
                                                                }
                                                    }))
        }
    })
})

const lecElemekTombositve = []
for (let i = 0; i < lecElemek.length; i += 160)
{
    lecElemekTombositve.push(lecElemek.slice(i, i+160))
}

const peldanyositottLecElemek = []                      //Ezeken csak alulrol lehet athatolni, nagy sebesseggnel atesik rajtuk az ember
lecElemekTombositve.forEach((sor, y) =>
{
    sor.forEach((karakter, x) =>
    {
        if(karakter === 1)
        {
            peldanyositottLecElemek.push(new  FalElem(
                                                    {
                                                        pozicio:
                                                                {
                                                                   x: x*12,
                                                                   y: y*12,
                                                                }
                                                    }))
        }
    })
})

const g = 9.80665/10

const jatekos = new Jatekos   ({
                                pozicio:
                                        {
                                            x: 45,
                                            y: 655,
                                        },
                                peldanyositottFalElemek,
                                peldanyositottLecElemek,
                                kepForras: './media/jatekos/Jatekos.png',
                            })

const gombok = 
                {
                    w:
                    {
                        lenyomva: false
                    },

                    a:
                    {
                        lenyomva: false
                    },

                    s:
                    {
                        lenyomva: false
                    },

                    d:
                    {
                        lenyomva: false
                    },

                    up:
                    {
                        lenyomva: false
                    },

                    left:
                    {
                        lenyomva: false
                    },

                    down:
                    {
                        lenyomva: false
                    },

                    right:
                    {
                        lenyomva: false
                    },

                    enter:
                    {
                        lenyomva: false
                    },

                    plus:
                    {
                        lenyomva: false
                    },

                    minus:
                    {
                        lenyomva: false
                    }

                }

const background = new Sprite
({
    pozicio:
    {
        x:0,
        y:0,
    },
    kepForras: './media/Hatter.png'
})

const kamera =
                {
                    pozicio:
                            {
                                x: 0,
                                y: -1080 + meretaranyositottCanvas.height,
                            }
                }

function futtatas()
{
    window.requestAnimationFrame(futtatas)

    c.fillStyle = hatterSzin
    c.fillRect(0, 0, canvas.width, canvas.height)
    
    c.save()
    c.scale(nagyitasiArany, (1024/1080)*nagyitasiArany)
    c.translate(kamera.pozicio.x, kamera.pozicio.y)
    background.frissites()

    // Platformkijelzes
    //peldanyositottFalElemek.forEach(falElem =>
    //                                         {
    //                                             falElem.frissites()
    //                                         })
    // peldanyositottLecElemek.forEach(lecElem =>
    //                                                         {
    //                                                             lecElem.frissites()
    //                                                         })
    

    jatekos.frissites()

    if (gombok.up.lenyomva)
    {
        jatekos.kameraLe({canvas, kamera, nagyitasiArany})
        jatekos.sebesseg.y -=    g * 3
    }
    if (gombok.left.lenyomva)
    {
        jatekos.kameraJobbra({canvas, kamera, nagyitasiArany})
        jatekos.sebesseg.x -=    1
    }
    if (gombok.down.lenyomva)
    {
        jatekos.kameraFel({canvas, kamera, nagyitasiArany})
        jatekos.sebesseg.x =     0
    }
    if (gombok.right.lenyomva)
    {
        jatekos.kameraBalra({canvas, kamera, nagyitasiArany})
        jatekos.sebesseg.x += 1
    }

    if (gombok.plus.lenyomva && Date.now() - stopper > 500) //Csak fel masodpercenkkent hagyja
    {
        nagyitasiArany *= 1.1;
        stopper = Date.now();
        gombok.plus.lenyomva = false;
    }
    
    if (gombok.minus.lenyomva && Date.now() - stopper > 500)
    {
        nagyitasiArany *= 0.9;
        stopper = Date.now();
        gombok.minus.lenyomva = false;
    }

    // jatekos.kameraJobbra({canvas, kamera, nagyitasiArany})
    // jatekos.kameraBalra({canvas, kamera, nagyitasiArany})
    // jatekos.kameraFel({canvas, kamera, nagyitasiArany})
    
    if(!(gombok.right.lenyomva || gombok.left.lenyomva)) jatekos.sebesseg.x = 0 //kameramozgas tesztelesehez

    c.restore()

    if(jatekos.pozicio.y === 303.99 && jatekos.pozicio.x >= 1845 && gombok.enter.lenyomva)
    {
        window.location.href = "https://kenermester.web.elte.hu/Palya2/"
    }


    if(jatekos.pozicio.y >= 987.99)
    { 
        jatekos.pozicio.y = 0
        alert("The Floor Is Lava!")
        window.location.reload()
    }



}

futtatas()

window.addEventListener('keydown', () =>
                        {
                            switch (event.keyCode)
                            {
                                case 13:
                                    gombok.enter.lenyomva   = true
                                    break

                                case 37:
                                    gombok.left.lenyomva    = true
                                    break
                                case 38:
                                    gombok.up.lenyomva      = true
                                    break
                                case 39:
                                    gombok.right.lenyomva   = true
                                    break
                                case 40:
                                    gombok.down.lenyomva    = true
                                    break

                                
                                case 65:
                                    gombok.a.lenyomva       = true
                                    break
                                case 68:
                                    gombok.d.lenyomva       = true
                                    break
                                case 83:
                                    gombok.s.lenyomva       = true
                                    break
                                case 87:
                                    gombok.w.lenyomva       = true
                                    break

                                // case 187:
                                //     gombok.plus.lenyomva    = true
                                //     break
                                // case 189:
                                //     gombok.minus.lenyomva   = true
                                //     break
                            }
                        })

window.addEventListener('keyup', () =>
                        {
                            switch (event.keyCode)
                            {
                                case 13:
                                    gombok.enter.lenyomva   = false
                                    break

                                case 37:
                                    gombok.left.lenyomva    = false
                                    break
                                case 38:
                                    gombok.up.lenyomva      = false
                                    break
                                case 39:
                                    gombok.right.lenyomva   = false
                                    break
                                case 40:
                                    gombok.down.lenyomva    = false
                                    break

                                
                                case 65:
                                    gombok.a.lenyomva      = false
                                    break
                                case 68:
                                    gombok.d.lenyomva       = false
                                    break
                                case 83:
                                    gombok.s.lenyomva       = false
                                    break
                                case 87:
                                    gombok.w.lenyomva       = false
                                    break

                                case 187:
                                    gombok.plus.lenyomva    = true
                                    break
                                case 189:
                                    gombok.minus.lenyomva   = true
                                    break
                            }
                        })