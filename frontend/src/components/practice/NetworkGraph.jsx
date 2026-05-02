export default function NetworkGraph({ variant, studentData, errors }) {
  if (!variant || variant.type !== "aoa") return null;

  const getEventData = (id) => studentData?.events?.[id] || {};

  const hasEventError = (id) => {
    return (
      errors?.events?.[id]?.ES ||
      errors?.events?.[id]?.LF ||
      errors?.events?.[id]?.T
    );
  };

  const hasWorkError = (index) => {
    const workErrors = errors?.works?.[index];
    if (!workErrors) return false;
    return Object.values(workErrors).some(Boolean);
  };

  const getEvent = (id) => {
    return variant.events.find((event) => event.id === id);
  };

  const getArrowPoints = (from, to) => {
    const radius = 28;

    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const length = Math.sqrt(dx * dx + dy * dy);

    if (length === 0) return "";

    const ux = dx / length;
    const uy = dy / length;

    const endX = to.x - ux * radius;
    const endY = to.y - uy * radius;

    const size = 8;

    const leftX = endX - ux * size - uy * size * 0.6;
    const leftY = endY - uy * size + ux * size * 0.6;

    const rightX = endX - ux * size + uy * size * 0.6;
    const rightY = endY - uy * size - ux * size * 0.6;

    return `${endX},${endY} ${leftX},${leftY} ${rightX},${rightY}`;
  };

  return (
    <div className="tm-network-wrapper">
      <svg
        className="tm-network-svg"
        viewBox={variant.viewBox || "0 0 720 420"}
        role="img"
        aria-label={variant.title}
      >
        {variant.works.map((work, index) => {
          const from = getEvent(work.from);
          const to = getEvent(work.to);

          if (!from || !to) return null;

          const isError = hasWorkError(index);

          const dx = to.x - from.x;
          const dy = to.y - from.y;
          const length = Math.sqrt(dx * dx + dy * dy);

          if (length === 0) return null;

          const radius = 28;

          const x1 = from.x + (dx / length) * radius;
          const y1 = from.y + (dy / length) * radius;
          const x2 = to.x - (dx / length) * radius;
          const y2 = to.y - (dy / length) * radius;

          const labelX = (x1 + x2) / 2 + (work.labelDx || 0);
          const labelY = (y1 + y2) / 2 + (work.labelDy || -8);

          const edgeClassName = isError
            ? "tm-edge tm-edge-error"
            : work.dummy
              ? "tm-edge tm-edge-dummy"
              : "tm-edge";

          const arrowClassName = isError
            ? "tm-arrow tm-edge-error"
            : work.dummy
              ? "tm-arrow tm-edge-dummy-arrow"
              : "tm-arrow";

          return (
            <g key={`${work.from}-${work.to}-${index}`}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                className={edgeClassName}
              />

              <polygon
                points={getArrowPoints(from, to)}
                className={arrowClassName}
              />

              {!work.dummy && (
                <text x={labelX} y={labelY} className="tm-edge-label">
                  {work.d}
                </text>
              )}
            </g>
          );
        })}

        {variant.events.map((event) => {
          const data = getEventData(event.id);
          const isError = hasEventError(event.id);

          return (
            <g key={event.id}>
              <circle
                cx={event.x}
                cy={event.y}
                r="28"
                className={isError ? "tm-node tm-node-error" : "tm-node"}
              />

              <line
                x1={event.x - 20}
                y1={event.y - 20}
                x2={event.x + 20}
                y2={event.y + 20}
                className="tm-node-divider"
              />

              <line
                x1={event.x + 20}
                y1={event.y - 20}
                x2={event.x - 20}
                y2={event.y + 20}
                className="tm-node-divider"
              />

              <text x={event.x} y={event.y - 12} className="tm-node-id">
                {event.id}
              </text>

              <text x={event.x - 15} y={event.y + 5} className="tm-node-value">
                {data.ES ?? ""}
              </text>

              <text x={event.x + 15} y={event.y + 5} className="tm-node-value">
                {data.LF ?? ""}
              </text>

              <text x={event.x} y={event.y + 21} className="tm-node-value">
                {data.T ?? ""}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}