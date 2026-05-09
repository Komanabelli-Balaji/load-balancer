const metrics = {};

export const incrementNodeMetric = (node) => {
  if (!metrics[node]) {
    metrics[node] = 0;
  }

  metrics[node]++;
}

export const getMetrics = () => {
  return metrics;
}