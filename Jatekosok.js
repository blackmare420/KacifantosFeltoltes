class Jatekos extends Sprite
{
    constructor({pozicio, peldanyositottFalElemek, peldanyositottLecElemek, kepForras})
    {
        super({ kepForras })
        this.pozicio   = pozicio
        this.sebesseg   =   {
                                x : 0,
                                y : 1,
                            }

        this.peldanyositottFalElemek = peldanyositottFalElemek
        this.peldanyositottLecElemek = peldanyositottLecElemek

        this.kameraDoboz =
                        {
                            pozicio: 
                                    {
                                        x: this.pozicio.x -190,
                                        y: this.pozicio.y -50,
                                    },
                            width: 400,
                            height: 160,
                        }
    }

    kameraDobozFrissites()
    {
        this.kameraDoboz =
                        {
                            pozicio: 
                                    {
                                        x: this.pozicio.x -190,
                                        y: this.pozicio.y -50,
                                    },
                            width: 400,
                            height: 160,
                        }
    }

    kameraFel({canvas, kamera, nagyitasiArany})
    {
        //if(this.kameraDoboz.pozicio.y + this.kameraDoboz.height + this.sebesseg.y <= 0) return

        if(this.kameraDoboz.pozicio.y + this.kameraDoboz.height  >= Math.abs(kamera.pozicio.y) + (canvas.height / nagyitasiArany))
        {
            kamera.pozicio.y -= this.sebesseg.y
        }
    }

    kameraLe({canvas, kamera, nagyitasiArany})
    {
        //if(this.kameraDoboz.pozicio.y + this.sebesseg.y <= 0) return

        if(this.kameraDoboz.pozicio.y <= Math.abs(kamera.pozicio.y))
        {
            kamera.pozicio.y -= this.sebesseg.y
        }
    }

    kameraBalra({canvas, kamera, nagyitasiArany})
    {
        //if(this.kameraDoboz.pozicio.x + this.kameraDoboz.width >= 1920) return

        if(this.kameraDoboz.pozicio.x + this.kameraDoboz.width >= (canvas.width / nagyitasiArany) + Math.abs(kamera.pozicio.x))
        {
            kamera.pozicio.x -= this.sebesseg.x
        }
    }

    kameraJobbra({canvas, kamera, nagyitasiArany})
    {
        //if(this.kameraDoboz.pozicio.x <= 0) return

        if(this.kameraDoboz.pozicio.x <= Math.abs(kamera.pozicio.x))
        {
            kamera.pozicio.x -= this.sebesseg.x
        }
    }

    frissites()
    {
        this.kameraDobozFrissites()
        c.fillStyle = 'rgba(0, 0, 255, 0.2)'
        c.fillRect( this.kameraDoboz.pozicio.x,
                    this.kameraDoboz.pozicio.y,
                    this.kameraDoboz.width,
                    this.kameraDoboz.height) //debughoz kellett csak kirajzolni

        this.kijelzes()
        
        //if (this.pozicio.y     +   this.height     +   this.sebesseg.y < canvas.height) this.sebesseg.y += g
        //else this.sebesseg.y    =   0
    
        this.pozicio.x         +=  this.sebesseg.x
        this.vizszintesUtkozesTeszt()
        this.gravitacioHatas()
        this.fuggolegesUtkozesTeszt()
    }

    vizszintesUtkozesTeszt()
    {
        for (let i = 0; i < this.peldanyositottFalElemek.length; i++)
        {
            const falElem = this.peldanyositottFalElemek[i]

            if ( utkozik(
                            {
                                object1: this,
                                object2: falElem,
                            }))
                {
                    if(this.sebesseg.x > 0)
                    {
                        this.sebesseg.x = 0
                        this.pozicio.x = falElem.pozicio.x - this.width - 0.01
                        break
                    }

                    if(this.sebesseg.x < 0)
                    {
                        this.sebesseg.x = 0
                        this.pozicio.x = falElem.pozicio.x + falElem.width + 0.01
                        break
                    }
                }
        }
    }

    gravitacioHatas()
    {
        this.pozicio.y         +=  this.sebesseg.y
        this.sebesseg.y         +=  g
    }

    fuggolegesUtkozesTeszt()
    {
        for (let i = 0; i < this.peldanyositottFalElemek.length; i++)
        {
            const falElem = this.peldanyositottFalElemek[i]

            if ( utkozik(
                            {
                                object1: this,
                                object2: falElem,
                            }))
                {
                    if(this.sebesseg.y > 0)
                    {
                        this.sebesseg.y = 0
                        this.pozicio.y = falElem.pozicio.y - this.height - 0.01 //ne tapadjon a talajba
                        break
                    }

                    if(this.sebesseg.y < 0)
                    {
                        this.sebesseg.y = 0
                        this.pozicio.y = falElem.pozicio.y + falElem.height + 0.01 //ne tapadjon a plafonba
                        break
                    }
                }
        }

        for (let i = 0; i < this.peldanyositottLecElemek.length; i++)
        {
            const lecElem = this.peldanyositottLecElemek[i]

            if ( falElemmelUtkozik(
                            {
                                object1: this,
                                object2: lecElem,
                            }))
            {
                    if(this.sebesseg.y > 0)
                    {
                        this.sebesseg.y = 0
                        this.pozicio.y = lecElem.pozicio.y - this.height - 0.01 //ne tapadjon a talajba
                        break
                    }
            }
        }
    }
}