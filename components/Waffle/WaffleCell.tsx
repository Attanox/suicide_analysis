import * as React from 'react';

const WaffleCell = (props: any) => {
  const {
    position,
    size,
    x,
    y,
    color,
    fill,
    opacity,
    borderWidth,
    borderColor,
    data,
    onHover,
    onLeave,
    onClick,
  } = props;

  return (
    <rect
      width={size}
      height={size}
      x={x}
      y={y}
      fill={fill || color}
      strokeWidth={borderWidth}
      stroke={borderColor}
      opacity={opacity}
      onMouseEnter={onHover}
      onMouseMove={onHover}
      onMouseLeave={onLeave}
      onClick={(event) => {
        onClick({ position, color, x, y, data }, event);
      }}
    />
  );
};

export default WaffleCell;
