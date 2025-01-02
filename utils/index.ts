export type Color = "YELLOW" | "GREEN" | "BLUE" | "VIOLET" | "PINK" | "RED";
export type Field = Color[][];

const COLORS: Color[] = ["YELLOW", "GREEN", "BLUE", "VIOLET", "PINK", "RED"];
const SIZE = 14;

export const colorMap: Record<Color, string> = {
  YELLOW: "#CFCF77",
  GREEN: "#6DB66D",
  BLUE: "#62CBCB",
  VIOLET: "#6D6DCA",
  PINK: "#BC80BC",
  RED: "#C06262",
};

function randomNum(max: number): number {
  return Math.floor(Math.random() * max);
}

export function updateField(field: Field, color: Color): Field {
  const currentColor = field[0][0];

  const help = function (field: Field, y: number, x: number): Field {
    if (field[y] && field[y][x] === currentColor) {
      field[y][x] = color;
      field = help(field, y, x + 1);
      field = help(field, y, x - 1);
      field = help(field, y - 1, x);
      return help(field, y + 1, x);
    }

    return field;
  };

  return help(field, 0, 0);
}

export function getInitialField(): Field {
  return [...new Array(SIZE)].map(() =>
    [...new Array(SIZE)].map(() => COLORS[randomNum(COLORS.length)])
  );
}

export function getFinalMessage(steps: number): string {
  if (steps < 21) {
    return "Excellent! This is a perfect score! 🥇";
  }
  if (steps < 26) {
    return "Good job! Congratulation! 🥈";
  }
  if (steps < 31) {
    return "Not bad! Try one more time. 🥉";
  }
  return "OK, but you can surelly better :)";
}
