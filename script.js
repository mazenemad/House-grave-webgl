import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { FrontSide, PointLight } from 'three'
import {FontLoader} from "three/examples/jsm/loaders/FontLoader.js"
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry.js"

/**
 * Base
 */
// Debug
// const gui = new dat.GUI()


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//loaders
const textureloader = new THREE.TextureLoader()
const fontloader = new FontLoader()
//texture

const doorColor= textureloader.load('/textures/door/color.jpg')
const doorAlpha= textureloader.load('/textures/door/alpha.jpg')
const doorAmbient= textureloader.load('/textures/door/ambientOcclusion.jpg')
const doorheight= textureloader.load('/textures/door/height.jpg')
const doornormal= textureloader.load('/textures/door/normal.jpg')
const doormetalness= textureloader.load('/textures/door/metalness.jpg')
const doorroughness= textureloader.load('/textures/door/roughness.jpg')
const wallcolor = textureloader.load('/textures/bricks/color.jpg')
const wallnormal = textureloader.load('/textures/bricks/normal.jpg')
const wallambient = textureloader.load('/textures/bricks/ambientOcclusion.jpg')
const wallroughness = textureloader.load('/textures/bricks/roughness.jpg')
const grasscolor = textureloader.load('/textures/grass/color.jpg')
const grassnormal = textureloader.load('/textures/grass/normal.jpg')
const grassambient = textureloader.load('/textures/grass/ambientOcclusion.jpg')
const grassroughness = textureloader.load('/textures/grass/roughness.jpg')


//texts
const textmaterial= new THREE.MeshStandardMaterial()
fontloader.load(
    '/fonts/Lobster_Regular.json',
    (font)=>{
      const textGeometry =  new TextGeometry(
        `Grave House
By Mazen `,
        {
            font: font,
            size: 0.2,
            height: 0.03,
            curveSegments: 0.1,
            bevelThickness: 0.1,
            bevelSize: 0.1,
            bevelOffset: 0,
            bevelSegments: 0.1
        } )
        const text = new THREE.Mesh(textGeometry,textmaterial)
        text .position.z=9.4
        text.position.x=-9
        text.position.y=0.47

        scene.add(text)
    }
)


//fog
const fog = new THREE.Fog('#262837',1,15)
scene.fog=fog

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
// gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight("#b9d5ff", 0.12)
directionalLight.position.set(2, 2, - 1)
// gui.add(directionalLight, 'intensity').min(0).max(1).step(0.001)
// gui.add(directionalLight.position, 'x').min(- 5).max(5).step(0.001)
// gui.add(directionalLight.position, 'y').min(- 5).max(5).step(0.001)
// gui.add(directionalLight.position, 'z').min(- 5).max(5).step(0.001)
directionalLight.castShadow=true
scene.add(directionalLight)
//frontlight
const frontlight = new THREE.PointLight('#ff7d46',1,9)
frontlight.position.set(0,2.2,2.8)

/**
 * Materials
 */
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.7
// gui.add(material, 'metalness').min(0).max(1).step(0.001)
// gui.add(material, 'roughness').min(0).max(1).step(0.001)

/**
 * Objects
 */

//house
const house= new THREE.Group()
scene.add(house)
const walls = new THREE.Mesh(
    new THREE.BoxBufferGeometry(4,3,4),
    new THREE.MeshStandardMaterial({
        transparent:true,
        map:wallcolor,
        normalMap:wallnormal,
        roughnessMap:wallroughness,
        aoMap:wallambient

    })
)
walls.geometry.setAttribute('uv2',
    new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
)
walls.position.y=3/2  
house.add(walls)

const housetop = new THREE.Mesh(
    new THREE.ConeGeometry(3.5,1,4),
    new THREE.MeshStandardMaterial({color:'#b35f45'})
)
housetop.position.y=3.5
housetop.position.x=-0.01
housetop.rotation.y= Math.PI/4
house.add(housetop)

const door = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(2.2,2.2,100,100),
    new THREE.MeshStandardMaterial({
        transparent:true,
        map:doorColor,
        alphaMap:doorAlpha,
        aoMap:doorAmbient,
        displacementMap:doorheight,
        displacementScale:0.1,
        normalMap:doornormal,
        roughnessMap:doorroughness,
        metalnessMap:doormetalness
        
    })
)
door.geometry.setAttribute('uv2',
    new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
)
door.position.y=1
door.position.x=-0.4
door.position.z=2.001
house.add(door)
//bushes
const bushGeometry = new THREE.SphereBufferGeometry(1,16,16)
const bushMaterial = new THREE.MeshStandardMaterial({color:'#89c854'})

const bush1=new THREE.Mesh(bushGeometry,bushMaterial)
bush1.scale.set(0.5,0.5,0.5)
bush1.position.set(0.8,0.2,2.2)

const bush2=new THREE.Mesh(bushGeometry,bushMaterial)
bush2.scale.set(0.25,0.25,0.25)
bush2.position.set(1.4,0.1,2.3)

const bush3=new THREE.Mesh(bushGeometry,bushMaterial)
bush3.scale.set(0.4,0.4,0.4)
bush3.position.set(-1.2,0.1,2.2)

const bush4=new THREE.Mesh(bushGeometry,bushMaterial)
bush4.scale.set(0.15,0.15,0.15)
bush4.position.set(-1.4,0.05,2.7)

bush1.castShadow=true
bush2.castShadow=true
bush3.castShadow=true
bush1.castShadow=true
door.castShadow=true
walls.castShadow=true

house.add(bush1,bush2,bush3,bush4)


//ground
const ground = new THREE.Group()
scene.add(ground)
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({
        transparent:true,
        map:grasscolor,
        normalMap:grassnormal,
        roughnessMap:grassroughness,
        aoMap:grassambient

    })
)
floor.geometry.setAttribute('uv2',
    new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
)
grasscolor.repeat.set(8,8)
grassnormal.repeat.set(8,8)
grassambient.repeat.set(8,8)
grassroughness.repeat.set(8,8)
grasscolor.wrapS= THREE.RepeatWrapping
grassnormal.wrapS= THREE.RepeatWrapping
grassambient.wrapS= THREE.RepeatWrapping
grassroughness.wrapS= THREE.RepeatWrapping
grasscolor.wrapT= THREE.RepeatWrapping
grassnormal.wrapT= THREE.RepeatWrapping
grassambient.wrapT= THREE.RepeatWrapping
grassroughness.wrapT= THREE.RepeatWrapping
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
floor.receiveShadow=true

ground.add(floor)

//graves
const graves = new THREE.Group()
scene.add(graves)
const graveGeometry = new THREE.BoxBufferGeometry(0.6,0.8,0.2)
const graveMaterial = new THREE.MeshStandardMaterial()
for(let i=0;i<50;i++){
const angle=(Math.random() * Math.PI *  2)
const radius=4+Math.random()*5
const x = Math.sin(angle)*radius
const z = Math.cos(angle)*radius   
const grave = new THREE.Mesh(graveGeometry,graveMaterial)
grave.position.set(x,0.3,z)
grave.rotation.y=(Math.random()-0.5)*0.5
grave.rotation.z=(Math.random()-0.5)*0.5
grave.castShadow=true

house.add(grave)
house.add(frontlight)
}

const gost1 = new THREE.PointLight('#ff00ff',2,2)
const gost2 = new THREE.PointLight('#00ffff',2 ,2)
const gost3 = new THREE.PointLight('#ffff00',2,3)
gost1.castShadow=true
gost2.castShadow=true
gost3.castShadow=true
ground.add(gost1,gost2,gost3)
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = -4
camera.position.y = 2
camera.position.z = 8
camera.lookAt(walls.position)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#262837')
renderer.shadowMap.enabled=true

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    //gosts animation
    const gostangle = elapsedTime*0.3
    gost1.position.x=Math.sin(gostangle)*(5+Math.sin(elapsedTime))
    gost1.position.z=Math.cos(gostangle)*(5+Math.sin(elapsedTime))
    gost1.position.y=Math.sin(gostangle *5)
    
    const gostangle2 = -elapsedTime*0.5
    gost2.position.x=Math.sin(gostangle2)*(7+Math.sin(elapsedTime))
    gost2.position.z=Math.cos(gostangle2)*(7+Math.sin(elapsedTime))
    gost2.position.y=Math.sin(gostangle *5)+Math.sin(gostangle *2)

    
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()