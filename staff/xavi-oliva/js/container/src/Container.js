function Container(width, height, length) {
    this.width = width
    this.height = height
    this.length = length

    this.status = '🔒'
}

Container.prototype.open = function () {
    this.status = '🔓'
}

Container.prototype.close = function () {
    this.status = '🔒'
}

