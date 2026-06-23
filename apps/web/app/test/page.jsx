"use client"
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef, useEffect, useState, useCallback } from 'react'
import { Physics, RigidBody } from '@react-three/rapier'
import { Environment } from '@react-three/drei'
import * as THREE from 'three'

const keys = {}

// --- Screens ---
function TutorialScreen({ onStart }) {
    return (
        <div style={{
            position: 'absolute', inset: 0, background: 'rgba(10,10,30,0.95)',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', zIndex: 20, color: 'white', padding: 24
        }}>
            <h1 style={{ fontSize: 32, marginBottom: 8 }}>🌀 Dodge Ball</h1>
            <p style={{ color: '#aaa', marginBottom: 32, textAlign: 'center' }}>
                Avoid the falling objects. You have 3 lives.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32, width: '100%', maxWidth: 340 }}>
                {[
                    ['⬆⬇⬅➡', 'Move the ball'],
                    ['Space', 'Jump'],
                    ['❤️❤️❤️', '3 lives total'],
                    ['💥', 'Flash = invincible'],
                ].map(([key, desc]) => (
                    <div key={key} style={{
                        background: 'rgba(255,255,255,0.05)', borderRadius: 10,
                        padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 4
                    }}>
                        <span style={{ fontSize: 20 }}>{key}</span>
                        <span style={{ fontSize: 13, color: '#aaa' }}>{desc}</span>
                    </div>
                ))}
            </div>
            <button onClick={onStart} style={{
                padding: '14px 48px', borderRadius: 50, border: 'none',
                background: 'royalblue', color: 'white', fontSize: 18,
                fontWeight: 'bold', cursor: 'pointer'
            }}>
                Start Game
            </button>
        </div>
    )
}

function GameOverScreen({ score, best, onRestart }) {
    return (
        <div style={{
            position: 'absolute', inset: 0, background: 'rgba(10,10,30,0.95)',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', zIndex: 20, color: 'white', padding: 24
        }}>
            <h1 style={{ fontSize: 36, marginBottom: 4 }}>💀 Game Over</h1>
            <p style={{ color: '#aaa', marginBottom: 32 }}>You ran out of lives</p>

            <div style={{ display: 'flex', gap: 24, marginBottom: 40 }}>
                <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: '16px 28px' }}>
                    <div style={{ fontSize: 13, color: '#aaa', marginBottom: 4 }}>SCORE</div>
                    <div style={{ fontSize: 36, fontWeight: 'bold' }}>{score}</div>
                </div>
                <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: '16px 28px' }}>
                    <div style={{ fontSize: 13, color: '#aaa', marginBottom: 4 }}>BEST</div>
                    <div style={{ fontSize: 36, fontWeight: 'bold', color: 'gold' }}>{best}</div>
                </div>
            </div>

            <button onClick={onRestart} style={{
                padding: '14px 48px', borderRadius: 50, border: 'none',
                background: 'royalblue', color: 'white', fontSize: 18,
                fontWeight: 'bold', cursor: 'pointer'
            }}>
                Play Again
            </button>
        </div>
    )
}

// --- Hearts HUD ---
function HeartsHUD({ lives, score }) {
    return (
        <div style={{
            position: 'absolute', top: 12, left: 0, right: 0,
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', padding: '0 16px', zIndex: 10
        }}>
            <div style={{ display: 'flex', gap: 6 }}>
                {[0, 1, 2, 3].map(i => (
                    <span key={i} style={{ fontSize: 26, filter: i < lives ? 'none' : 'grayscale(1) opacity(0.3)' }}>
                        ❤️
                    </span>
                ))}
            </div>
            <div style={{ color: 'white', fontWeight: 'bold', fontSize: 18, textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                {score}s
            </div>
        </div>
    )
}

// --- Mobile Controls ---
function MobileControls() {
    const btn = (code, content) => (
        <button
            key={code}
            onPointerDown={() => { keys[code] = true }}
            onPointerUp={() => { keys[code] = false }}
            onPointerLeave={() => { keys[code] = false }}
            style={{
                width: 56, height: 56, borderRadius: 12,
                background: 'rgba(255,255,255,0.15)',
                border: '2px solid rgba(255,255,255,0.3)',
                color: 'white', fontSize: 20,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                touchAction: 'none', userSelect: 'none', cursor: 'pointer'
            }}
        >
            {content}
        </button>
    )

    return (
        <div style={{
            position: 'absolute', bottom: 24, width: '100%',
            display: 'flex', justifyContent: 'space-between',
            padding: '0 24px', boxSizing: 'border-box', zIndex: 10,
            pointerEvents: 'none'
        }}>
            <div style={{
                display: 'grid', pointerEvents: 'all',
                gridTemplateColumns: '56px 56px 56px',
                gridTemplateRows: '56px 56px 56px', gap: 6
            }}>
                <div />{btn('ArrowUp', '▲')}<div />
                {btn('ArrowLeft', '◀')}<div />{btn('ArrowRight', '▶')}
                <div />{btn('ArrowDown', '▼')}<div />
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', pointerEvents: 'all' }}>
                <button
                    onPointerDown={() => { keys['Space'] = true; setTimeout(() => { keys['Space'] = false }, 100) }}
                    style={{
                        width: 70, height: 70, borderRadius: '50%',
                        background: 'rgba(100,160,255,0.3)',
                        border: '2px solid rgba(100,160,255,0.7)',
                        color: 'white', fontSize: 14, fontWeight: 'bold',
                        touchAction: 'none', userSelect: 'none', cursor: 'pointer'
                    }}
                >
                    JUMP
                </button>
            </div>
        </div>
    )
}

// --- Spawned Object wrapper ---
function SpawnedObject({ id, position, shape, onHitBall, onRemove }) {
    const onExpire = useCallback(() => onRemove(id), [id, onRemove])
    return <FallingObject id={id} position={position} shape={shape} onHitBall={onHitBall} onExpire={onExpire} />
}

// --- Falling object ---
// Give each falling object a unique name and let it self-destruct on hit
function FallingObject({ id, position, shape, onHitBall, onExpire }) {
    const rb = useRef()
    const indicatorRef = useRef()
    const isDead = useRef(false)  // prevent double fire

    useEffect(() => {
        const timer = setTimeout(onExpire, 10000)
        return () => clearTimeout(timer)
    }, [onExpire])

    useFrame(() => {
        if (!rb.current || !indicatorRef.current) return
        const pos = rb.current.translation()
        const height = Math.max(0, pos.y)
        const scale = Math.max(0.1, Math.min(1, height / 8))
        indicatorRef.current.position.set(pos.x, 0.01, pos.z)
        indicatorRef.current.scale.setScalar(scale)
        indicatorRef.current.material.opacity = Math.min(0.7, height / 8)
    })

    return (
        <>
            <RigidBody
                ref={rb}
                interpolate
                position={position}
                name={`object-${id}`}
                colliders={shape === 'ball' ? 'ball' : 'cuboid'}
                onCollisionEnter={({ other }) => {
                    if (other.rigidBodyObject?.name === 'player' && !isDead.current) {
                        isDead.current = true   // 👈 block any further events
                        onHitBall()             // tell parent to lose a life
                        onExpire()              // 👈 despawn immediately
                    }
                }}
            >
                <mesh castShadow>
                    {shape === 'ball' ? <sphereGeometry args={[0.4, 16, 16]} /> : <boxGeometry args={[0.8, 0.8, 0.8]} />}
                    <meshStandardMaterial color={shape === 'ball' ? 'tomato' : 'orange'} />
                </mesh>
            </RigidBody>

            <mesh ref={indicatorRef} rotation={[-Math.PI / 2, 0, 0]} position={[position[0], 0.01, position[2]]}>
                {shape === 'ball' ? <circleGeometry args={[0.6, 32]} /> : <planeGeometry args={[1.2, 1.2]} />}
                <meshBasicMaterial color={shape === 'ball' ? 'tomato' : 'orange'} transparent opacity={0.5} depthWrite={false} />
            </mesh>
        </>
    )
}

// --- Spawner ---
function Spawner({ onHitBall, ballRef }) {
    const [objects, setObjects] = useState([])

    const remove = useCallback((id) => {
        setObjects(prev => prev.filter(o => o.id !== id))
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            let ox = 0, oz = 0
            if (ballRef.current) {
                const vel = ballRef.current.linvel()
                const speed = Math.sqrt(vel.x ** 2 + vel.z ** 2)
                const pos = ballRef.current.translation()
                ox = pos.x + (speed > 0.5 ? (vel.x / speed) * 5 : 0)
                oz = pos.z + (speed > 0.5 ? (vel.z / speed) * 5 : 0)
            }
            ox = Math.max(-9, Math.min(9, ox + (Math.random() - 0.5) * 4))
            oz = Math.max(-9, Math.min(9, oz + (Math.random() - 0.5) * 4))
            setObjects(prev => [...prev, {
                id: Date.now(),
                position: [ox, 12, oz],
                shape: Math.random() > 0.5 ? 'ball' : 'box'
            }])
        }, 2000)
        return () => clearInterval(interval)
    }, [ballRef])

    return objects.map(obj => (
        <SpawnedObject key={obj.id} {...obj} onHitBall={onHitBall} onRemove={remove} />
    ))
}

// --- Camera follow ---
function CameraFollow({ targetRef }) {
    const { camera } = useThree()
    const currentPos = useRef(new THREE.Vector3(0, 8, 12))
    const currentLook = useRef(new THREE.Vector3())

    useFrame((_, delta) => {
        if (!targetRef.current) return
        const pos = targetRef.current.translation()
        const vel = targetRef.current.linvel()
        const speed = Math.sqrt(vel.x ** 2 + vel.z ** 2)
        const smoothing = Math.min(1, 5 * delta + speed * 0.05)
        currentPos.current.lerp(new THREE.Vector3(pos.x, pos.y + 8, pos.z + 12), smoothing)
        currentLook.current.lerp(new THREE.Vector3(pos.x, pos.y, pos.z), smoothing)
        camera.position.copy(currentPos.current)
        camera.lookAt(currentLook.current)
    })

    return null
}

// --- Ball ---
function Ball({ meshRef, onHit }) {
    const rb = useRef()
    const meshLocalRef = useRef()
    const isGrounded = useRef(false)
    const invincible = useRef(false)
    const flashInterval = useRef()
    const hitLock = useRef(false)  // 👈 single hit lock

    const triggerInvincibility = useCallback(() => {
        invincible.current = true
        hitLock.current = true  // 👈 lock immediately on hit
        let flashes = 0
        clearInterval(flashInterval.current)
        flashInterval.current = setInterval(() => {
            flashes++
            if (meshLocalRef.current)
                meshLocalRef.current.visible = flashes % 2 === 0
            if (flashes >= 12) {
                clearInterval(flashInterval.current)
                if (meshLocalRef.current) meshLocalRef.current.visible = true
                invincible.current = false
                hitLock.current = false  // 👈 unlock only after flash ends
            }
        }, 150)
    }, [])

    const handleHit = useCallback(() => {
        if (hitLock.current) return  // 👈 hard lock, not just invincible check
        onHit()
        triggerInvincibility()
    }, [onHit, triggerInvincibility])

    // check if ball fell off the ground
    useFrame(() => {
        if (!rb.current) return
        const s = 0.15
        if (keys['ArrowUp']) rb.current.applyTorqueImpulse({ x: -s, y: 0, z: 0 }, true)
        if (keys['ArrowDown']) rb.current.applyTorqueImpulse({ x: s, y: 0, z: 0 }, true)
        if (keys['ArrowLeft']) rb.current.applyTorqueImpulse({ x: 0, y: 0, z: s }, true)
        if (keys['ArrowRight']) rb.current.applyTorqueImpulse({ x: 0, y: 0, z: -s }, true)
        if (keys['Space'] && isGrounded.current) {
            rb.current.applyImpulse({ x: 0, y: 8, z: 0 }, true)
            isGrounded.current = false
            keys['Space'] = false
        }

        // 👇 fell off platform — instant death
        const pos = rb.current.translation()
        if (pos.y < -5 && !hitLock.current) {
            hitLock.current = true
            onHit('fall')  // signal fall
        }
    })

    useEffect(() => {
        const down = (e) => {
            keys[e.code] = true
            if (e.code === 'Space' && isGrounded.current) {
                rb.current?.applyImpulse({ x: 0, y: 8, z: 0 }, true)
                isGrounded.current = false
                keys['Space'] = false
            }
        }
        const up = (e) => (keys[e.code] = false)
        window.addEventListener('keydown', down)
        window.addEventListener('keyup', up)
        return () => {
            window.removeEventListener('keydown', down)
            window.removeEventListener('keyup', up)
            clearInterval(flashInterval.current)
        }
    }, [])

    return (
        <RigidBody
            ref={(ref) => { rb.current = ref; meshRef.current = ref }}
            name="player"
            colliders="ball"
            position={[0, 2, 0]}
            linearDamping={0.5}
            angularDamping={0.5}
            interpolate
            friction={1}
            onCollisionEnter={({ other }) => {
                const name = other.rigidBodyObject?.name
                if (name !== 'player') isGrounded.current = true
                if (name !== 'ground' && name !== 'player') handleHit()
            }}
        >
            <mesh ref={meshLocalRef}>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial color="royalblue" roughness={0.3} metalness={0.4} />
            </mesh>
        </RigidBody>
    )
}

// --- Scene ---
function Scene({ onHit }) {
    const ballRef = useRef()
    return (
        <>
            <CameraFollow targetRef={ballRef} />
            <Physics gravity={[0, -9.8, 0]} timeStep="vary">
                <RigidBody type="fixed" name="ground" friction={1}>
                    <mesh position={[0, -0.5, 0]}>
                        <boxGeometry args={[20, 1, 20]} />
                        <meshStandardMaterial color="#7ec850" roughness={0.8} />
                    </mesh>
                </RigidBody>
                <Ball meshRef={ballRef} onHit={onHit} />
                <Spawner onHitBall={onHit} ballRef={ballRef} />
            </Physics>
        </>
    )
}

// --- Root ---
export default function Game() {
    const [screen, setScreen] = useState('tutorial') // tutorial | playing | gameover
    const [lives, setLives] = useState(4)
    const [score, setScore] = useState(0)
    const [best, setBest] = useState(0)
    const isMobile = useRef(typeof window !== 'undefined' && window.innerWidth < 768)
    const scoreInterval = useRef()

    const startGame = useCallback(() => {
        setLives(3)
        setScore(0)
        setScreen('playing')
    }, [])

    // tick score every second while playing
    useEffect(() => {
        if (screen === 'playing') {
            scoreInterval.current = setInterval(() => setScore(s => s + 1), 1000)
        } else {
            clearInterval(scoreInterval.current)
        }
        return () => clearInterval(scoreInterval.current)
    }, [screen])

    const loseLife = useCallback((reason) => {
        if (reason === 'fall') {
            // instant game over
            setBest(b => Math.max(b, score))
            setScreen('gameover')
            setLives(0)
            return
        }
        setLives(prev => {
            const next = prev - 1
            if (next <= 0) {
                setBest(b => Math.max(b, score))
                setScreen('gameover')
            }
            return next
        })
    }, [score])

    return (
        <div style={{
            width: '100vw', height: '100vh', overflow: 'hidden',
            background: '#1a1a2e', display: 'flex',
            alignItems: 'center', justifyContent: 'center'
        }}>
            <div style={{
                position: 'relative',
                width: isMobile.current ? '100vw' : '800px',
                height: isMobile.current ? '100vh' : '600px',
                borderRadius: isMobile.current ? 0 : 16,
                overflow: 'hidden',
                boxShadow: '0 0 40px rgba(0,0,0,0.6)'
            }}>
                {screen === 'tutorial' && <TutorialScreen onStart={startGame} />}
                {screen === 'gameover' && <GameOverScreen score={score} best={best} onRestart={startGame} />}

                {screen === 'playing' && <HeartsHUD lives={lives} score={score} />}

                <Canvas camera={{ position: [0, 8, 12], fov: 50 }} frameloop="always">
                    <Environment preset="sunset" />
                    <ambientLight intensity={0.3} />
                    <directionalLight position={[10, 15, 5]} intensity={1} castShadow />
                    {screen === 'playing' && <Scene onHit={loseLife} />}
                </Canvas>

                {screen === 'playing' && isMobile.current && <MobileControls />}
            </div>
        </div>
    )
}