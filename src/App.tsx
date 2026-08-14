import styles from './app.module.css'

import { Header } from './components/Header'
import { Tip } from './components/Tip'
import { Letter } from "./components/Letter"
import { Input } from "./components/Input"
import { Button } from "./components/Button"

export default function App() {
  function handleRestartGame() {
    alert('Reiniciando o jogo...')
  }

  return (
    <>
      <div className={styles.container}>
        <main>
          <Header current={1} max={10} onRestart={handleRestartGame} />
          <Tip tip="Dica de teste" />
          <div className={styles.word}>
            <Letter value="R"></Letter>
            <Letter value="R"></Letter>
            <Letter value="R"></Letter>
            <Letter value="R"></Letter>
          </div>
          <h4>Palpite</h4>
          <div className={styles.guess}>
            <Input autoFocus maxLength={1}/>
            <Button title="Confirmar"/>
          </div>
        </main>
      </div>
    </>
  )
}