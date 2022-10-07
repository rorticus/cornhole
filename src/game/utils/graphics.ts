interface FontDefinition {
  [key: string]: {
    x: number;
    y: number;
    width: number;
    height: number;
    spacing: number;
  };
}

export function drawFromFont(
  str: string,
  font: CanvasImageSource,
  definition: FontDefinition
) {
  const imageParts: {
    srcX: number;
    srcY: number;
    width: number;
    height: number;
    dstX: number;
  }[] = [];

  let left = 0;
  let height = 0;

  str.split("").forEach((chr) => {
    if (chr in definition) {
      imageParts.push({
        srcX: definition[chr].x,
        srcY: definition[chr].y,
        width: definition[chr].width,
        height: definition[chr].height,
        dstX: left,
      });

      left += definition[chr].spacing;
      height = Math.max(height, definition[chr].height);
    }
  });

  const result = document.createElement("canvas");
  result.width = left;
  result.height = height;
  const ctx = result.getContext("2d")!;

  imageParts.forEach((image) => {
    ctx.drawImage(
      font,
      image.srcX,
      image.srcY,
      image.width,
      image.height,
      image.dstX,
      0,
      image.width,
      image.height
    );
  });

  return result;
}

export function loadImage(url: string) {
  const img = new Image();
  img.src = url;

  return img;
}
