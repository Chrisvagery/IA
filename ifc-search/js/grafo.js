const graph = [
  {
    name: "LabD03",
    coord: { x: 100, y: 500 },
    neighbors: [
      { node: "LabD04", distance: 10 },
      { node: "Corredor 1", distance: 30 },
    ],
  },
  {
    name: "LabD04",
    coord: { x: 150, y: 480 },
    neighbors: [
      { node: "LabD03", distance: 10 },
      { node: "LabD05", distance: 15 },
    ],
  },
  {
    name: "LabD05",
    coord: { x: 200, y: 470 },
    neighbors: [
      { node: "LabD04", distance: 15 },
      { node: "LabD06", distance: 20 },
    ],
  },
  {
    name: "LabD06",
    coord: { x: 250, y: 460 },
    neighbors: [
      { node: "LabD05", distance: 20 },
      { node: "LabD07", distance: 10 },
    ],
  },
  {
    name: "LabD07",
    coord: { x: 300, y: 450 },
    neighbors: [
      { node: "LabD06", distance: 10 },
      { node: "Corredor 1", distance: 25 },
    ],
  },
  {
    name: "Corredor 1",
    coord: { x: 350, y: 500 },
    neighbors: [
      { node: "LabD03", distance: 30 },
      { node: "LabD07", distance: 25 },
      { node: "Entrada Principal", distance: 50 },
    ],
  },
  {
    name: "Entrada Principal",
    coord: { x: 400, y: 520 },
    neighbors: [
      { node: "Corredor 1", distance: 50 },
      { node: "Refeitório", distance: 20 },
    ],
  },
  {
    name: "Refeitório",
    coord: { x: 450, y: 540 },
    neighbors: [
      { node: "Entrada Principal", distance: 20 },
      { node: "Guarita", distance: 40 },
    ],
  },
  {
    name: "Guarita",
    coord: { x: 500, y: 550 },
    neighbors: [
      { node: "Refeitório", distance: 40 },
      { node: "Ginásio", distance: 70 },
    ],
  },
  {
    name: "Ginásio",
    coord: { x: 550, y: 560 },
    neighbors: [
      { node: "Guarita", distance: 70 },
      { node: "Academia", distance: 30 },
    ],
  },
  {
    name: "Academia",
    coord: { x: 600, y: 570 },
    neighbors: [
      { node: "Ginásio", distance: 30 },
      { node: "Biblioteca", distance: 100 },
    ],
  },
  {
    name: "Biblioteca",
    coord: { x: 650, y: 580 },
    neighbors: [
      { node: "Academia", distance: 100 },
      { node: "Administração", distance: 80 },
    ],
  },
  {
    name: "Administração",
    coord: { x: 700, y: 600 },
    neighbors: [
      { node: "Biblioteca", distance: 80 },
      { node: "Auditório", distance: 60 },
    ],
  },
  {
    name: "Auditório",
    coord: { x: 750, y: 620 },
    neighbors: [
      { node: "Administração", distance: 60 },
      { node: "Cantinha", distance: 50 },
    ],
  },
  {
    name: "Cantinha",
    coord: { x: 800, y: 640 },
    neighbors: [
      { node: "Auditório", distance: 50 },
      { node: "Estacionamento", distance: 90 },
    ],
  },
  {
    name: "Estacionamento",
    coord: { x: 850, y: 650 },
    neighbors: [
      { node: "Cantinha", distance: 90 },
      { node: "Lago", distance: 120 },
    ],
  },
  {
    name: "Lago",
    coord: { x: 900, y: 660 },
    neighbors: [
      { node: "Estacionamento", distance: 120 },
      { node: "gabinetes dos professores", distance: 110 },
    ],
  },
  {
    name: "gabinetes dos professores",
    coord: { x: 950, y: 670 },
    neighbors: [
      { node: "Lago", distance: 110 },
      { node: "SalaF01", distance: 40 },
    ],
  },
  {
    name: "SalaF01",
    coord: { x: 1000, y: 680 },
    neighbors: [
      { node: "gabinetes dos professores", distance: 40 },
      { node: "SalaF05", distance: 30 },
    ],
  },
  {
    name: "SalaF05",
    coord: { x: 1050, y: 690 },
    neighbors: [
      { node: "SalaF01", distance: 30 },
      { node: "SalaF06", distance: 20 },
    ],
  },
  {
    name: "SalaF06",
    coord: { x: 1100, y: 700 },
    neighbors: [
      { node: "SalaF05", distance: 20 },
      { node: "SalaF08", distance: 25 },
    ],
  },
  {
    name: "SalaF08",
    coord: { x: 1150, y: 710 },
    neighbors: [{ node: "SalaF06", distance: 25 }],
  },
];

// Mapeando nomes para IDs únicos
const nodeNameToId = {};
graph.forEach((node, index) => {
  nodeNameToId[node.name] = index + 1;
});

// Criando nós dinamicamente
const nodes = new vis.DataSet(
  graph.map((node, index) => ({
    id: index + 1,
    label: node.name,
    shape: "circle",
  }))
);

// Criando arestas dinamicamente
const edges = new vis.DataSet(
  graph.flatMap((node) =>
    node.neighbors.map((neighbor) => ({
      from: nodeNameToId[node.name],
      to: nodeNameToId[neighbor.node],
      label: `${neighbor.distance}m`,
    }))
  )
);

// Configuração e inicialização da rede
const container = document.getElementById("network");
const data = { nodes, edges };
const options = {
  edges: {
    arrows: { to: { enabled: false } },
    font: { align: "middle" },
    color: "blue",
  },
  nodes: {
    shape: "circle",
    color: "lightblue",
    font: { color: "black", size: 16 },
  },
  physics: {
    enabled: false,
  },
};

// Inicializa a rede
const network = new vis.Network(container, data, options);

// Uso do algoritmo A* e exibição do resultado
const start = "LabD03";
const goal = "Biblioteca";
const path = aStar(graph, start, goal);

console.log(`Caminho mais curto de ${start} até ${goal}: ${path.join(" -> ")}`);
