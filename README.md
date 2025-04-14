# 🧠 Quantum Superposition Simulator

This project simulates the **quantum measurement** of a single **qubit in superposition** using a **NestJS backend** and a **React frontend**. When a qubit is measured, it collapses from a probabilistic state to a definite outcome (`0` or `1`)—this app lets you simulate and visualize that process.

---

## 🔬 Concept

A qubit can be represented as:

```
|ψ⟩ = α|0⟩ + β|1⟩
```

Where `α` and `β` are complex numbers such that:

```
|α|² + |β|² = 1
```

Upon **measurement**, the qubit collapses to:
- `|0⟩` with probability `|α|²`
- `|1⟩` with probability `|β|²`

---

## 🧰 Tech Stack

| Layer         | Tech Stack             |
|--------------|------------------------|
| Backend       | NestJS, TypeScript     |
| Frontend      | React (Vite), TypeScript |
| Visualization | Recharts (Bar chart)   |
| Communication | REST API (Axios)       |

---

## 📂 Project Structure

```
quantum-simulator/
├── quantum-backend/        # NestJS app
│   └── src/qubit/          # Qubit logic + API
│       ├── qubit.service.ts
│       ├── qubit.controller.ts
│
├── quantum-frontend/       # React app
│   └── src/App.tsx         # Main UI and logic
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Ranganagth/quantum-simulator.git
cd quantum-simulator
```

---

### 2. Backend Setup (NestJS)

```bash
cd quantum-backend
npm install
npm run start:dev
```

> Runs on: `http://localhost:3000`

#### Qubit API Endpoint

```http
POST /qubit/measure
```

**Response:**
```json
{ "outcome": 0 }  // or 1
```

---

### 3. Frontend Setup (React + Vite)

```bash
cd quantum-frontend
npm install
npm run dev
```

> Runs on: `http://localhost:5173`

---

## 📊 Features

- Simulates qubit measurement
- Visualizes number of times `0` or `1` is measured
- Real-time interactive UI
- Quantum randomness (not pseudo-deterministic)

---

## 🧠 Core Files

### `qubit.service.ts` (Backend)
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

---

### `App.tsx` (Frontend)
```tsx
const [counts, setCounts] = useState({ 0: 0, 1: 0 });

const measureQubit = async () => {
  const res = await axios.post<{ outcome: 0 | 1 }>('http://localhost:3000/qubit/measure');
  const outcome = res.data.outcome;
  setCounts(prev => ({ ...prev, [outcome]: prev[outcome] + 1 }));
};
```

---

## 🌱 Future Improvements

| Feature                     | Description |
|----------------------------|-------------|
| Custom `α` and `β` inputs  | Allow user-defined superpositions |
| Bulk measurements          | Run 1000+ measurements in one go |
| Animated collapse          | Visual effect of wavefunction collapse |
| State display              | Show pre- and post-measurement state |
| Quantum Zeno simulation    | Measure repeatedly to "freeze" the state |

---

## 🎓 Educational Purpose

This project is designed to help understand:
- Qubit behavior and quantum measurement
- Probability and randomness in quantum mechanics
- Type-safe API communication
- Data visualization with React

---

## 📄 License

This project is open-source and free to use for educational and learning purposes.

---

## 🙌 Acknowledgements

- [NestJS](https://nestjs.com/)
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Recharts](https://recharts.org/)

---

## 📬 Feedback or Contributions?

Feel free to open issues or submit pull requests to enhance the simulator!
