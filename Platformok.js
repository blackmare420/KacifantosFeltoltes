class FalElem
{
    constructor({pozicio})
    {
        this.pozicio = pozicio
        this.width  = 12
        this.height = 12
    }

    kijelzes()
    {
        c.fillStyle = 'rgba(139, 69, 19, 0.6)'
        c.fillRect(this.pozicio.x, this.pozicio.y, this.width, this.height)
    }

    frissites()
    {
        this.kijelzes()
    }
}