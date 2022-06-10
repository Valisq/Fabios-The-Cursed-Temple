function changeLevel (levelNum: number) {
    if (levelNum == 1) {
        game.showLongText("(Level 1)How could you Fabio", DialogLayout.Bottom)
        tiles.setCurrentTilemap(tilemap`Level 1`)
    } else if (levelNum == 2) {
        game.showLongText("(Level 2)Come back Fabio, the log Fabio", DialogLayout.Bottom)
        tiles.setCurrentTilemap(tilemap`level4`)
    } else if (levelNum == 3) {
        game.showLongText("(Level 3)You betrayed him Fabio, he trusted you", DialogLayout.Bottom)
        tiles.setCurrentTilemap(tilemap`level8`)
    } else if (levelNum == 4) {
        game.showLongText("(Level 4) He was your friend why would you do such a thing", DialogLayout.Bottom)
    } else if (levelNum == 5) {
        game.showLongText("(Level 5 all after this is level 5) (Fabio shakes in his crown) ( he see's his friend that he killed)", DialogLayout.Bottom)
    }
    tiles.placeOnRandomTile(Fabios, sprites.dungeon.stairLarge)
}
scene.onOverlapTile(SpriteKind.Enemy, sprites.dungeon.hazardHole, function (sprite, location) {
    EnemyGhost.destroy(effects.trail, 500)
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.hazardHole, function (sprite, location) {
    currentLevel += 1
    changeLevel(currentLevel)
    scene.cameraShake(4, 500)
    music.smallCrash.play()
})
function EnemyGhosts () {
    for (let value of tiles.getTilesByType(sprites.dungeon.hazardSpike)) {
        EnemyGhost = sprites.create(img`
            ........................
            ........333..3c3........
            .......cc3....33c.......
            ......cc33....c33c......
            ......c33ccffc3c33......
            ......c3ff1111ff3c......
            .......cb111111b3.......
            .......f11111111f.......
            ......fd11111111df......
            ......fd11111111df......
            ......fddd1111dddf......
            ......fbdcbddbcdbf......
            ......fcdc3113cdcf......
            .....ffff111111bf.......
            ....fc111cdb1bdfff......
            ....f1b1bcbfbfc111cf....
            ....fbfbfbffff1b1b1f....
            .........fffffffbfbf....
            ..........fffff.........
            ...........fff..........
            ...............fffc.....
            ........fffccccccff.....
            .........fffffcfff......
            ............fcff........
            `, SpriteKind.Enemy)
        tiles.placeOnTile(EnemyGhost, value)
        if (Math.percentChance(100)) {
            EnemyGhost.vx = -50
        } else {
            EnemyGhost.vx = 50
        }
    }
}
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.buttonTeal, function (sprite, location) {
    music.jumpUp.play()
    tiles.setTileAt(tiles.getTileLocation(22, 21), sprites.dungeon.doorOpenWest)
    tiles.setWallAt(tiles.getTileLocation(22, 21), false)
    tiles.setTileAt(tiles.getTileLocation(2, 5), sprites.dungeon.buttonTeal)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    music.spooky.play()
    Fabios.destroy(effects.coolRadial, 500)
    pause(1000)
    game.over(false)
})
let EnemyGhost: Sprite = null
let currentLevel = 0
let Fabios: Sprite = null
game.splash("Fabios: The Cursed Temple", "Be aware! Enemy ghosts ahead.")
Fabios = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . 5 . . . . . 5 . . . . 
    . . . . . 5 . . 5 . . 5 . . . . 
    . . . . . 5 5 . 5 . 5 5 . . . . 
    . . . . . 5 5 5 5 5 5 5 . . . . 
    . . . . 2 2 2 2 2 2 2 2 2 . . . 
    . . . f f f f f f f f f f f . . 
    . . f f 7 7 7 7 7 7 7 7 7 f f . 
    . . f 7 7 7 7 7 7 7 7 7 7 7 f . 
    . . f 7 7 7 7 f 7 f 7 7 7 7 f . 
    . f f 7 7 7 7 f 7 f 7 7 7 7 f f 
    . f 7 7 7 7 7 7 7 7 7 7 7 7 7 f 
    . f 7 7 7 7 7 7 7 7 7 7 7 7 7 f 
    . f f f f f f f f f f f f f f f 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
Fabios.setPosition(34, 115)
controller.moveSprite(Fabios)
scene.cameraFollowSprite(Fabios)
game.showLongText("Drop down the rooms to meet the final boss and regain your throne!", DialogLayout.Bottom)
game.showLongText("There are some locked doors so you may need to find buttons to open them!", DialogLayout.Bottom)
currentLevel = 1
changeLevel(1)
EnemyGhosts()
game.onUpdate(function () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        if (value.isHittingTile(CollisionDirection.Left)) {
            EnemyGhost.vx = -50
        } else if (value.isHittingTile(CollisionDirection.Right)) {
            EnemyGhost.vx = 50
        }
    }
})
game.onUpdateInterval(1000, function () {
    EnemyGhost.setVelocity(randint(-70, 70), randint(-50, 50))
})
forever(function () {
    music.playMelody("E E D D C C E C ", 110)
})
