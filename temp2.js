// Fill in the ? with a Javascript expression to set the
// scale for an image having a given original height and
// width so that it can exactly fit inside a maxdim-by-maxdim
// square area (touching at least two edges).


function scaleImage(width, height, maxdim) {
  // var scale = width > height ? maxdim / width : maxdim / width;
  var scale = width > height ? maxdim / width : maxdim / height;
  return [scale * width, scale * height];
}

console.log(scaleImage(23, 54, 87));

/*
w = 10, h = 7, maxdim = 5
original
|-------------------|
|                   |
|                   |
|                   |
|-------------------|

scaled
5 x 5
|---------|
|         |
|         |
|---------|

height = 5



*/