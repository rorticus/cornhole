import { SystemContext } from "../../engine/states";
import { Arm, Components, Position } from "../components";
import {
  DrawingContext,
  Resources,
  Score,
  ThrowingAngle,
  ThrowingPower,
} from "../resources";
import { armImage } from "../assets";

export function drawUISystem(context: SystemContext<Components, Resources>) {
  const angle = context.resources.get(ThrowingAngle) || 0;
  const power = context.resources.get(ThrowingPower) || 0;
  const ctx = context.resources.get(DrawingContext);
  const arm = context.entities.getEntities([Arm])[0];

  if (ctx && arm) {
    ctx.save();

    const armPosition = arm.component(Position)!;

    ctx.translate(armPosition[0] + 30, armPosition[1] + 20);
    ctx.rotate(-(angle + Math.PI / 2));
    ctx.translate(-armPosition[0] - 30, -armPosition[1] - 20);
    ctx.drawImage(armImage, armPosition[0], armPosition[1]);

    ctx.restore();

    ctx.save();

    // const offsetX = 25;
    // const offsetY = 20;

    // ctx.strokeStyle = "green";
    // ctx.lineWidth = 4;
    // ctx.beginPath();
    // ctx.moveTo(armPosition[0] + offsetX, armPosition[1] + offsetY);
    // ctx.lineTo(armPosition[0] + offsetX + Math.cos(angle) * 100, armPosition[1] + offsetY - Math.sin(angle) * 100);
    // ctx.stroke();

    ctx.fillStyle = "white";
    ctx.fillRect(100, 20, 840, 40);

    ctx.fillStyle = "red";
    ctx.fillRect(100, 20, 840 * power, 40);

    ctx.fillStyle = "black";
    ctx.font = "24px sans-serif";
    ctx.textBaseline = "top";
    ctx.fillText("POWER", 460, 30);

    ctx.restore();

    // ctx.save();
    // context.entities.getEntities([ScoreZone]).forEach((entity) => {
    //   const p = entity.component(Position)!;
    //   const s = entity.component(Size)!;
    //
    //   ctx.strokeStyle = "pink";
    //   ctx.lineWidth = 5;
    //   ctx.strokeRect(p[0], p[1], s[0], s[1]);
    // });
    // ctx.restore();

    // score
    ctx.save();
    ctx.font = "78px sans-serif";
    ctx.fillStyle = "black";
    const score = context.resources.get(Score) || 0;
    ctx.textBaseline = "top";
    const size = ctx.measureText(`${score}`);
    ctx.fillText(`${score}`, 1024 / 2 - size.width / 2, 650);
    ctx.restore();
  }
}
