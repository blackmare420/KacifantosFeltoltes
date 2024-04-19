class Sprite
{
    constructor({pozicio, kepForras})
    {
        this.pozicio = pozicio
        this.image = new Image()
        this.image.onload = () =>           //csak akkor allitjuk a meretet, ha mar betoltodott
        {
            this.width  = this.image.width
            this.height = this.image.height
        }
        this.image.src = kepForras
    }

    kijelzes()
    {
        if(!this.image) return
        c.drawImage(this.image, this.pozicio.x, this.pozicio.y)
    }

    frissites()
    {
        this.kijelzes()
    }
}