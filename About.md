# 🧠 Quantum Superposition Simulator – Full Documentation

---

## 🧾 Overview

This app simulates **quantum measurement** of a single **qubit in superposition** and visualizes the **collapse** of the quantum state upon measurement.

A **qubit** is defined as:

$$
|\psi\rangle = \alpha|0\rangle + \beta|1\rangle
$$

The act of **measurement** causes this state to collapse to `0` or `1`, with probabilities:

- $$ P(0) = |\alpha|^2 $$
- $$ P(1) = |\beta|^2 $$

The frontend interacts with the backend to simulate this process and shows how many times `0` and `1` have been observed.

---

## ⚙️ Technologies Used

| Layer         | Tech Stack                        |
|---------------|-----------------------------------|
| Backend       | NestJS (TypeScript)               |
| Frontend      | ReactJS (Vite + TypeScript)       |
| Visualization | Recharts (bar chart)              |
| Communication | REST API (`axios`)                |
| Language      | TypeScript                        |

---

## 🧩 Project Structure

```
quantum-simulator/
├── quantum-backend/         # NestJS app
│   └── src/
│       └── qubit/           # Qubit module (logic + API)
│           ├── qubit.service.ts
│           ├── qubit.controller.ts
├── quantum-frontend/        # React app
│   └── src/
│       └── App.tsx          # Main component (UI + logic)
```

---

## 📦 Backend – NestJS

### ✅ Endpoint

**POST `/qubit/measure`**

- Simulates measurement of a qubit
- Returns either `{ outcome: 0 }` or `{ outcome: 1 }`

### 📄 `qubit.service.ts`

```ts
@Injectable()
export class QubitService {
  alpha = 1 / Math.sqrt(2);
  beta = 1 / Math.sqrt(2);

  measure(): { outcome: 0 | 1 } {
    const prob0 = this.alpha ** 2;
    return { outcome: Math.random() < prob0 ? 0 : 1 };
  }
}
```

### 📄 `qubit.controller.ts`

```ts
@Controller('qubit')
export class QubitController {
  constructor(private readonly qubitService: QubitService) {}

  @Post('measure')
  measureQubit() {
    return this.qubitService.measure();
  }
}
```

### 🧰 Enable CORS (`main.ts`)

```ts
app.enableCors({
  origin: 'http://localhost:5173',
});
```

---

## 🖥️ Frontend – ReactJS + Recharts

### 🧠 State Management

```ts
type QubitOutcome = 0 | 1;
type Counts = Record<QubitOutcome, number>;

const [counts, setCounts] = useState<Counts>({ 0: 0, 1: 0 });
```

### 📡 API Call to Measure Qubit

```tsx
const res = await axios.post<{ outcome: QubitOutcome }>('http://localhost:3000/qubit/measure');
const outcome = res.data.outcome;
setCounts(prev => ({ ...prev, [outcome]: prev[outcome] + 1 }));
```

### 📊 Visualization with Recharts

```tsx
<BarChart width={300} height={200} data={[
  { outcome: '0', count: counts[0] },
  { outcome: '1', count: counts[1] }
]}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="outcome" />
  <YAxis />
  <Tooltip />
  <Bar dataKey="count" fill="#8884d8" />
</BarChart>
```

---

## 🧪 Setup & Run Instructions

### 1. Clone or Create the Project

```bash
# Backend
nest new quantum-backend
cd quantum-backend
nest g module qubit
nest g service qubit
nest g controller qubit

# Frontend
npm create vite@latest quantum-frontend --template react-ts
cd quantum-frontend
npm install
npm install axios recharts
```

---

### 2. Start Backend

```bash
cd quantum-backend
npm run start:dev
```

> Runs on: `http://localhost:3000`

---

### 3. Start Frontend

```bash
cd quantum-frontend
npm run dev
```

> Runs on: `http://localhost:5173`

---

## 📌 Features

- Qubit measurement using quantum probabilities
- Real-time bar chart of outcomes (0s and 1s)
- Simple and interactive interface
- Clean NestJS + React TypeScript integration

---

## 🚀 Future Improvements

| Feature                      | Description |
|-----------------------------|-------------|
| Set custom `alpha`/`beta`   | Let user input probability amplitudes (with validation) |
| Run bulk simulations        | Simulate 1000+ measurements in one click |
| State vector display        | Show current wavefunction before and after collapse |
| Animation                   | Animate superposition and collapse |
| Add "Quantum Zeno Effect"   | Demonstrate measurement slowing down state change |

---

## 🧠 Learning Goals

This project helps explore:
- Quantum measurement & superposition
- Probability simulation
- React state updates and charting
- REST API design in NestJS
- Typed TypeScript-safe coding patterns

---
