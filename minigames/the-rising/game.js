// Game Configuration
const config = {
    canvas: {
        width: 400,  // Base width (will scale to screen)
        height: 700  // Base height (will scale to screen)
    },
    block: {
        width: 60,
        height: 30,
        speed: 2
    },
    water: {
        riseSpeed: 0.3,
        freezeSpeed: 5
    },
    colors: {
        human: '#ff6b6b',
        humanFace: '#fff',
        water: 'rgba(64, 156, 255, 0.7)',
        ice: 'rgba(200, 230, 255, 0.8)',
        deadHuman: 'rgba(100, 100, 100, 0.5)',
        boat: '#8B4513',
        raft: '#CD853F',
        mattress: '#FF6347'
    },
    floatTypes: ['boat', 'raft', 'mattress']
};

// Sound Manager is defined globally in sounds.js
// We'll use the global soundManager instance

// Game State
const game = {
    canvas: null,
    ctx: null,
    level: 1,
    score: 0,
    survivors: 30,
    totalPeople: 30,
    state: 'menu', // menu, playing, paused, freezing, transitioning, gameOver, ending
    
    hero: null, // To store data about the player's character
    
    currentBlock: null,
    stackedBlocks: [],
    deadBlocks: [],
    frozenLayers: [],
    
    water: {
        y: config.water.startY,
        rising: true
    },
    
    targetHeight: 100,
    direction: 1,
    spawnFromLeft: true, // Alternate between left and right spawning
    
    init() {
        this.canvas = document.getElementById('gameCanvas');
        if (!this.canvas) {
            console.error('Canvas element not found!');
            const msg = document.getElementById('message');
            if (msg) {
                msg.textContent = 'ERROR: Canvas not found!';
                msg.classList.add('show');
            }
            return;
        }
        
        this.ctx = this.canvas.getContext('2d');
        if (!this.ctx) {
            console.error('Could not get 2D context!');
            const msg = document.getElementById('message');
            if (msg) {
                msg.textContent = 'ERROR: Canvas context failed!';
                msg.classList.add('show');
            }
            return;
        }
        
        // Set canvas size to match mobile screen
        this.resizeCanvas();

        // Sound manager is already created globally in sounds.js
        // No need to create a new instance here
        
        // Handle window resize/orientation change
        window.addEventListener('resize', () => this.resizeCanvas());
        window.addEventListener('orientationchange', () => {
            setTimeout(() => this.resizeCanvas(), 100);
        });
        
        // Touch/Click events
        this.canvas.addEventListener('click', () => {
            // Resume audio context on first user interaction
            if (typeof soundManager !== 'undefined' && soundManager && soundManager.audioContext && soundManager.audioContext.state === 'suspended') {
                soundManager.audioContext.resume().then(() => {
                    soundManager.playTension();
                    soundManager.playWaterAmbient();
                });
            }
            this.handleTap();
        });
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            // Resume audio context on first user interaction
            if (typeof soundManager !== 'undefined' && soundManager && soundManager.audioContext && soundManager.audioContext.state === 'suspended') {
                soundManager.audioContext.resume().then(() => {
                    soundManager.playTension();
                    soundManager.playWaterAmbient();
                });
            }
            this.handleTap();
        }, { passive: false });
        
        // Prevent double-tap zoom on iOS
        this.canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
        }, { passive: false });
        
        // Keyboard controls
        window.addEventListener('keydown', (e) => {
            // Only handle keyboard input if the game is in a state that expects it
            if (['menu', 'playing', 'paused'].includes(this.state)) {
                
                // Start game from menu
                if (this.state === 'menu' && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    this.startGame();
                    return; // Stop further processing
                }
                
                // Pause/Unpause
                if ((this.state === 'playing' || this.state === 'paused') && (e.key === 'Escape' || e.key === 'p' || e.key === 'P')) {
                    e.preventDefault();
                    this.togglePause();
                    return; // Stop further processing
                }

                // Place block
                if (this.state === 'playing' && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    this.handleTap();
                    return; // Stop further processing
                }
            }
            
            // Restart game (can be done from any state, even game over)
            if (e.key === 'r' || e.key === 'R') {
                e.preventDefault();
                this.restartGame();
            }
        });
        
        // Start the game loop
        this.gameLoop();
        
        // AUTO-START - Start game automatically after a short delay
        setTimeout(() => {
            if (this.state === 'menu') {
                this.startGame();
            }
        }, 500);
    },
    
    startGame() {
        this.state = 'playing';
        this.level = 1;
        this.survivors = 30;
        this.totalPeople = 30;
        this.stackedBlocks = [];
        this.deadBlocks = [];
        this.frozenLayers = [];
        // Start with clearly visible water (bottom 200px)
        this.water.y = config.canvas.height - 200;
        this.water.rising = true;
        // Target height is 20% from top of screen (challenging but achievable)
        this.targetHeight = config.canvas.height * 0.2;
        this.spawnFromLeft = true;
        this.direction = 1;
        this.updateUI();
        this.hideMessage();
        this.spawnBlock();

        // Initialize audio on first real interaction
        if (typeof soundManager !== 'undefined' && soundManager) {
            soundManager.init();
            // Resume audio context if suspended (required for autoplay policies)
            if (soundManager.audioContext && soundManager.audioContext.state === 'suspended') {
                soundManager.audioContext.resume();
            }
            // Start subtle ambient/tension sounds (will work after user interaction)
            // Don't play sounds immediately - wait for user interaction
        }
        
        // Show level start message
        this.showMessage(`LEVEL ${this.level}\n\nBuild your tower to the GOAL line!`);
        setTimeout(() => this.hideMessage(), 3000); // Hide after 3 seconds
    },
    
    togglePause() {
        if (this.state === 'playing') {
            this.state = 'paused';
            this.showMessage('PAUSED\n\nESC or P to resume\nR to restart');
        } else if (this.state === 'paused') {
            this.state = 'playing';
            this.hideMessage();
        }
    },
    
    restartGame() {
        // Reset everything to initial state
        this.level = 1;
        this.score = 0;
        this.survivors = 30;
        this.totalPeople = 30;
        this.state = 'menu';
        this.hero = null; // Reset hero
        this.currentBlock = null;
        this.stackedBlocks = [];
        this.deadBlocks = [];
        this.frozenLayers = [];
        // Reset water to visible position
        this.water.y = config.canvas.height - 200;
        this.water.rising = true;
        this.targetHeight = 100;
        this.spawnFromLeft = true;
        this.direction = 1;
        this.hideMessage();
        this.updateUI();
    },
    
    resizeCanvas() {
        // Get device pixel ratio for crisp rendering
        const dpr = window.devicePixelRatio || 1;
        
        // Get actual screen dimensions - always use full viewport
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        
        // Set display size (css pixels) - always full viewport
        this.canvas.style.width = screenWidth + 'px';
        this.canvas.style.height = screenHeight + 'px';
        
        // Set actual size in memory (scaled by dpr for retina displays)
        this.canvas.width = screenWidth * dpr;
        this.canvas.height = screenHeight * dpr;
        
        // Reset transform and scale context to match dpr
        this.ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
        this.ctx.scale(dpr, dpr);
        
        // Store logical dimensions
        config.canvas.width = screenWidth;
        config.canvas.height = screenHeight;
        
        // Scale block size based on screen width (bigger on desktop)
        config.block.width = Math.floor(screenWidth * 0.2); // 20% of screen width
        config.block.height = Math.floor(config.block.width * 0.5); // Half of width
        config.block.speed = Math.max(2, screenWidth * 0.005); // Proportional speed
        
        // Update water start position (keep it visible at bottom 200px)
        if (this.water.y > config.canvas.height - 200) {
            this.water.y = config.canvas.height - 200;
        }
        
        // Recalculate target height based on current level
        if (this.level === 1) {
            this.targetHeight = config.canvas.height * 0.2;
        } else {
            const targetPercent = 0.2 + (this.level - 1) * 0.05;
            this.targetHeight = config.canvas.height * Math.min(targetPercent, 0.4);
        }
    },
    
    spawnBlock() {
        if (this.survivors <= 0) {
            // Don't end level here - let update() check if goal was reached
            return;
        }
        
        const lastBlock = this.stackedBlocks[this.stackedBlocks.length - 1];
        
        // Determine spawn Y position
        let startY;
        if (lastBlock) {
            // Spawn above the last block, with some space
            startY = lastBlock.y - config.block.height - 50;
            // But don't spawn too high - keep it in the middle-upper area of screen
            const maxSpawnY = config.canvas.height * 0.3; // 30% from top
            if (startY < maxSpawnY) {
                startY = maxSpawnY;
            }
        } else {
            // First block: spawn just above water
            startY = this.water.y - config.block.height - 20;
        }
        
        // Ensure block doesn't spawn too high (above screen) or too low (in water)
        if (startY < 100) {
            startY = 100;
        }
        if (startY > this.water.y - config.block.height) {
            startY = this.water.y - config.block.height - 10;
        }
        
        let startX;
        if (this.spawnFromLeft) {
            startX = 60;
            this.direction = 1;
        } else {
            startX = config.canvas.width - config.block.width - 60;
            this.direction = -1;
        }
        this.spawnFromLeft = !this.spawnFromLeft;
        const floatType = config.floatTypes[Math.floor(Math.random() * config.floatTypes.length)];
        let isHeroBlock = this.level === 1 && this.stackedBlocks.length === 0 && !this.currentBlock;
        this.currentBlock = {
            x: startX,
            y: startY,
            width: config.block.width,
            height: config.block.height,
            hasName: Math.random() > 0.7,
            name: this.generateName(),
            survivalCount: 0,
            scared: false,
            floatType: floatType,
            peopleCount: isHeroBlock ? 1 : Math.floor(Math.random() * 2) + 1,
            isHero: isHeroBlock,
            direction: this.direction,
            velocity: 0
        };
        if (isHeroBlock) {
            this.hero = this.currentBlock;
        }
        this.survivors--;
        this.updateUI();
    },
    
    generateName() {
        const names = ['Anna', 'Ben', 'Chen', 'David', 'Emma', 'Frank', 'Grace', 'Henry', 'Iris', 'Jack'];
        return names[Math.floor(Math.random() * names.length)];
    },
    
    handleTap() {
        // Start game from menu on tap
        if (this.state === 'menu') {
            this.startGame();
            return;
        }
        
        // Prevent action unless actively playing
        if (this.state !== 'playing' || !this.currentBlock) return;
        
        let placed = false;
        if (this.stackedBlocks.length === 0) {
            // This is the FIRST block, it creates the foundation.
            // Position it just above the water
            this.currentBlock.y = this.water.y - this.currentBlock.height - 10;
            this.stackedBlocks.push(this.currentBlock);
            placed = true;
            
            // Check if first block somehow reached goal (shouldn't happen, but safety check)
            if (this.currentBlock.y <= this.targetHeight) {
                setTimeout(() => {
                    if (this.state === 'playing') {
                        this.endLevel(false);
                    }
                }, 500);
            }
        } else {
            // Otherwise, place it on the stack and check for overhang.
            placed = this.placeBlock();
        }

        // After placing, the currentBlock is gone.
        this.currentBlock = null;

        if (placed) {
            // A new block should spawn now
            this.spawnBlock();
        }
    },
    
    placeBlock() {
        // This function handles blocks placed on TOP of other blocks.
        const placedBlock = this.currentBlock;
        const baseBlock = this.stackedBlocks[this.stackedBlocks.length - 1];

        // This should not happen, but as a safeguard:
        if (!baseBlock) {
            console.error("placeBlock called without a baseBlock!");
            return false;
        }
        
        // Save original block dimensions before modifying
        const originalWidth = placedBlock.width;
        const originalX = placedBlock.x;
        const originalPeopleCount = placedBlock.peopleCount;
        
        // Calculate the overlap percentage
        const overlapStart = Math.max(placedBlock.x, baseBlock.x);
        const overlapEnd = Math.min(placedBlock.x + placedBlock.width, baseBlock.x + baseBlock.width);
        const overlapWidth = Math.max(0, overlapEnd - overlapStart);
        const overlapRatio = overlapWidth / originalWidth;

        if (overlapRatio > 0.1) { // Need at least 10% overlap to be stable
            // Calculate people saved - ensure at least 1 person is saved if there's sufficient overlap
            let peopleToSave = Math.max(1, Math.floor(originalPeopleCount * overlapRatio));
            // But don't save more than the actual people count
            peopleToSave = Math.min(peopleToSave, originalPeopleCount);
            const peopleLost = originalPeopleCount - peopleToSave;
            
            // Position the block on top of the base block
            placedBlock.y = baseBlock.y - placedBlock.height;
            // Adjust the block to only the stable, overlapping part
            placedBlock.x = overlapStart;
            placedBlock.width = overlapWidth;
            placedBlock.peopleCount = peopleToSave;
            
            this.stackedBlocks.push(placedBlock);
            this.score += 10 * peopleToSave;

            // Play stack sound (and perfect if almost full overlap)
            if (typeof soundManager !== 'undefined' && soundManager) {
                soundManager.playStack();
                if (overlapRatio > 0.9) {
                    soundManager.playPerfect();
                }
            }

            if (peopleLost > 0) {
                // Calculate which side the falling part should be on
                const lostWidth = originalWidth - overlapWidth;
                let fallingX;
                if (originalX < baseBlock.x) {
                    // Block was to the left, falling part is on the left
                    fallingX = originalX;
                } else if (originalX + originalWidth > baseBlock.x + baseBlock.width) {
                    // Block was to the right, falling part is on the right
                    fallingX = overlapEnd;
                } else {
                    // Block was centered, falling part could be on either side
                    fallingX = originalX < baseBlock.x ? originalX : overlapEnd;
                }
                
                // Create a "falling" block for the people who were lost
                const fallingPart = {
                    x: fallingX,
                    y: baseBlock.y,
                    width: lostWidth,
                    height: config.block.height,
                    peopleCount: peopleLost,
                    falling: true,
                    velocity: 0,
                    isHero: placedBlock.isHero && peopleToSave === 0,
                    drowned: false,
                    floatType: placedBlock.floatType
                };
                this.deadBlocks.push(fallingPart);
            }
            
            // Check if the hero fell
            if (placedBlock.isHero && peopleToSave === 0) {
                this.endLevel(true); // Game over, hero died
                return false; // Placement failed
            }
            
            // Check if tower reached target height after successful placement
            if (placedBlock.y <= this.targetHeight) {
                // Tower reached the goal! End level after a brief delay
                setTimeout(() => {
                    if (this.state === 'playing') {
                        this.endLevel(false);
                    }
                }, 500);
            }
            
            return true; // Placement was successful

        } else {
            // Not enough overlap, the whole block falls
            placedBlock.falling = true;
            placedBlock.velocity = 0;
            placedBlock.y = baseBlock.y; // Start falling from the base block position
            this.deadBlocks.push(placedBlock);
            this.score -= 10;

            if (typeof soundManager !== 'undefined' && soundManager) {
                soundManager.playSplash();
                soundManager.playDrown();
            }
            
            if (placedBlock.isHero) {
                this.endLevel(true); // Game over, hero died
                return false; // Placement failed
            }
        }
        return false; // Placement failed
    },
    
    calculateOverlap(block1, block2) {
        const left1 = block1.x;
        const right1 = block1.x + block1.width;
        const left2 = block2.x;
        const right2 = block2.x + block2.width;
        
        const overlapLeft = Math.max(left1, left2);
        const overlapRight = Math.min(right1, right2);
        
        return Math.max(0, overlapRight - overlapLeft);
    },
    
    endLevel(heroDied = false) {
        this.water.rising = false;
        
        if (heroDied) {
            this.showMessage('YOU HAVE DIED\n\nPress R to Restart');
            if (typeof soundManager !== 'undefined' && soundManager) {
                soundManager.playDrown();
            }
            this.state = 'gameOver';
            return;
        }

        const success = this.stackedBlocks.length > 0 && this.stackedBlocks[this.stackedBlocks.length - 1].y <= this.targetHeight;
        
        if (success) {
            this.state = 'freezing';
            this.initialWaterY = this.water.y; // Store the water level when freezing starts
            this.water.rising = false;
            
            // Play freezing and level complete sounds
            if (typeof soundManager !== 'undefined' && soundManager) {
                soundManager.playFreeze();
                soundManager.playLevelComplete();
            }
            
            // Show message
            this.showMessage('WATER FREEZING...');
            
            setTimeout(() => {
                this.freezeLevel();
            }, 2000);
        } else {
            this.state = 'gameOver'; // Game over if not enough blocks
            this.showMessage('GAME OVER\n\nPress R to Restart');
            if (typeof soundManager !== 'undefined' && soundManager) {
                soundManager.playWarning();
            }
        }
    },
    
    freezeLevel() {
        // Determine survivors
        const aboveWater = this.stackedBlocks.filter(b => b.y < this.water.y);
        const belowWater = this.stackedBlocks.filter(b => b.y >= this.water.y);
        
        // Save frozen layer
        this.frozenLayers.push({
            blocks: [...this.stackedBlocks, ...this.deadBlocks],
            waterLevel: this.water.y,
            level: this.level
        });
        
        // Calculate survivors for next level
        const survivorCount = Math.floor(aboveWater.length * 0.6) + 5; // Some survive
        this.survivors = survivorCount;
        this.totalPeople = survivorCount + Math.floor(this.level * 10); // More people join
        
        this.showMessage(`${survivorCount} SURVIVORS\nLEVEL ${this.level + 1}`);
        
        setTimeout(() => {
            this.nextLevel();
        }, 3000);
    },
    
    nextLevel() {
        this.level++;
        
        // Check if we reached level 6 (after completing level 5)
        if (this.level > 5) {
            this.showMessage('ASCENDING TO HEAVEN...');
            this.state = 'ending';
            setTimeout(() => {
                this.startEnding();
            }, 2000);
            return;
        }
        
        // Keep frozen blocks as background
        this.stackedBlocks = [];
        this.deadBlocks = [];
        
        // New target height - progressively harder (higher up the screen)
        // Level 2: 25% from top, Level 3: 30%, Level 4: 35%, Level 5: 40%
        const targetPercent = 0.2 + (this.level - 1) * 0.05;
        this.targetHeight = config.canvas.height * Math.min(targetPercent, 0.4);
        
        // Water starts a bit higher than the frozen layer
        this.water.y = this.water.y - 50;
        // Make sure water doesn't go above the frozen blocks
        if (this.frozenLayers.length > 0) {
            const lastFrozen = this.frozenLayers[this.frozenLayers.length - 1];
            if (this.water.y < lastFrozen.waterLevel) {
                this.water.y = lastFrozen.waterLevel + 20;
            }
        }
        
        this.state = 'playing';
        
        this.updateUI();
        this.hideMessage();
        this.spawnBlock();
    },
    
    startEnding() {
        // Load ending sequence
        if (typeof EndingSequence !== 'undefined') {
            this.ending = new EndingSequence(this);
            this.ending.start();
            this.state = 'ending';
        }
    },
    
    update() {
        // Don't update if in menu or paused
        if (this.state === 'menu' || this.state === 'paused') {
            return;
        }
        
        if (this.state === 'ending' && this.ending) {
            // Update ending sequence
            this.ending.update(0.016); // ~60fps
            return;
        }
        
        if (this.state === 'playing') {
            // Move current block
            if (this.currentBlock) {
                this.currentBlock.x += config.block.speed * this.direction;
                
                // Bounce off walls
                if (this.currentBlock.x <= 0 && this.direction === -1) {
                    this.direction = 1; // Move right
                } else if (this.currentBlock.x + this.currentBlock.width >= config.canvas.width && this.direction === 1) {
                    this.direction = -1; // Move left
                }
                
                // Check if water reached block
                if (this.currentBlock.y >= this.water.y - 10) {
                    this.currentBlock.scared = true;
                }
            }
            
            // Rise water (but stop if we've reached the target height)
            if (this.water.rising && this.water.y > this.targetHeight) {
                this.water.y -= config.water.riseSpeed;
                // Don't let water go above target height
                if (this.water.y < this.targetHeight) {
                    this.water.y = this.targetHeight;
                }
            }
            
            // Update falling blocks
            this.deadBlocks.forEach(block => {
                if (block.falling) {
                    block.velocity += 0.5; // Gravity
                    block.y += block.velocity;
                    
                    // Hit water
                    if (block.y >= this.water.y) {
                        block.falling = false;
                    }
                }
            });
            
            // Check for drowning
            this.stackedBlocks.forEach(block => {
                if (block.y >= this.water.y && !block.drowned) {
                    block.drowned = true;
                    this.deadBlocks.push({...block});
                }
            });
            
            // Check if tower reached target height
            if (this.stackedBlocks.length > 0) {
                const topBlock = this.stackedBlocks[this.stackedBlocks.length - 1];
                if (topBlock.y <= this.targetHeight) {
                    // Tower reached the goal!
                    this.endLevel(false);
                }
            }
            
            // Check if we ran out of survivors and have blocks
            if (this.survivors <= 0 && this.stackedBlocks.length > 0 && !this.currentBlock) {
                // No more survivors to spawn, check if we reached the goal
                const topBlock = this.stackedBlocks[this.stackedBlocks.length - 1];
                if (topBlock.y > this.targetHeight) {
                    // Didn't reach goal in time
                    this.endLevel(false);
                }
            }
        } else if (this.state === 'freezing') {
            // Water freezes (rises quickly to show freeze effect)
            if (this.water.y > 0) {
                this.water.y -= config.water.freezeSpeed;
            }
        }
    },
    
    draw() {
        if (!this.ctx || !this.canvas) {
            return; // Can't draw without context
        }
        
        // Clear canvas with background
        this.ctx.fillStyle = '#1a1a2e';
        this.ctx.fillRect(0, 0, config.canvas.width, config.canvas.height);
        
        // Menu screen
        if (this.state === 'menu') {
            this.drawMenu();
            return;
        }
        
        // If ending sequence is playing, draw that instead
        if (this.state === 'ending' && this.ending) {
            this.ending.draw(this.ctx);
            return;
        }
        
        // --- NEW DRAWING ORDER ---
        
        // 1. Draw water and ice separately for animation
        this.drawWaterAndIce();
        
        // 2. Draw frozen layers FIRST
        this.frozenLayers.forEach(layer => {
            // Draw frozen dead bodies
            layer.blocks.forEach(block => {
                if (block.y >= layer.waterLevel - 20) {
                    this.ctx.fillStyle = config.colors.deadHuman;
                    this.ctx.fillRect(block.x, block.y, block.width, block.height);
                    
                    // Draw simple face
                    this.ctx.fillStyle = 'rgba(255,255,255,0.3)';
                    const eyeSize = 2;
                    this.ctx.fillRect(block.x + 10, block.y + 8, eyeSize, eyeSize);
                    this.ctx.fillRect(block.x + block.width - 15, block.y + 8, eyeSize, eyeSize);
                }
            });
        });
        
        // 3. Draw target line
        this.ctx.strokeStyle = 'rgba(255, 255, 0, 0.8)'; // Bright yellow and more opaque
        this.ctx.lineWidth = 3; // Thicker line
        this.ctx.setLineDash([10, 10]); // Longer dashes
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.targetHeight);
        this.ctx.lineTo(config.canvas.width, this.targetHeight);
        this.ctx.stroke();
        this.ctx.setLineDash([]);
        
        // Add "GOAL" text next to the line
        this.ctx.fillStyle = 'rgba(255, 255, 0, 0.8)';
        this.ctx.font = 'bold 16px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillText('GOAL', 10, this.targetHeight - 10);
        
        // 4. Draw stacked blocks (living humans above water)
        this.stackedBlocks.forEach(block => {
            if (!block.drowned) {
                this.drawHuman(block);
            }
        });
        
        // 5. Draw dead/falling blocks
        this.deadBlocks.forEach(block => {
            this.ctx.fillStyle = config.colors.deadHuman;
            this.ctx.fillRect(block.x, block.y, block.width, block.height);
        });
        
        // 6. Draw current moving block LAST (so it's on top of everything)
        if (this.currentBlock) {
            // Draw the detailed boat + people
            this.drawHuman(this.currentBlock, true);
        }

        // 7. Cinematic overlays (e.g., during freezing)
        if (this.state === 'freezing' && this.hero) {
            this.drawHeroCinematic();
        }
    },
    
    drawWaterAndIce() {
        // Clamp water position to screen
        if (this.water.y > config.canvas.height) this.water.y = config.canvas.height;
        if (this.water.y < 0) this.water.y = 0;

        // Draw main water body (BRIGHT BLUE for visibility)
        this.ctx.fillStyle = config.colors.water;
        this.ctx.fillRect(0, this.water.y, config.canvas.width, config.canvas.height - this.water.y);

        // Draw the freezing animation layer on top of the water
        if (this.state === 'freezing') {
            // Calculate freeze progress (water rises to show freeze effect)
            const freezeDistance = config.canvas.height * 0.3; // Freeze animation distance
            const freezeProgress = Math.min(1, (this.initialWaterY - this.water.y) / freezeDistance);
            const iceColor = `rgba(173, 216, 230, ${Math.min(freezeProgress * 0.8, 0.8)})`; // Light blue, semi-transparent ice
            this.ctx.fillStyle = iceColor;
            this.ctx.fillRect(0, this.water.y, config.canvas.width, config.canvas.height - this.water.y);
        }

        // Draw water surface effect
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.water.y);
        this.ctx.lineTo(config.canvas.width, this.water.y);
        this.ctx.stroke();
    },

    drawHeroCinematic() {
        const heroBlock = this.hero;
        if (!heroBlock) return;

        this.ctx.save();

        // Darken background slightly
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
        this.ctx.fillRect(0, 0, config.canvas.width, config.canvas.height);

        // Compute hero center
        const heroCenterX = heroBlock.x + heroBlock.width / 2;
        const heroCenterY = heroBlock.y + heroBlock.height / 2;

        // Slight breathing zoom
        const t = Date.now();
        const pulse = 1 + 0.05 * Math.sin(t * 0.005);
        const zoom = 2.0 * pulse;

        // Zoom into hero
        this.ctx.translate(config.canvas.width / 2, config.canvas.height / 2);
        this.ctx.scale(zoom, zoom);
        this.ctx.translate(-heroCenterX, -heroCenterY);

        // Draw hero block enlarged
        this.drawHuman(heroBlock, false);

        this.ctx.restore();

        // Text overlay
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        this.ctx.font = 'bold 20px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('SOME SURVIVE. MANY FREEZE BELOW.', config.canvas.width / 2, 40);
    },

    drawHuman(block, isMoving = false) {
        if (!block) {
            console.error('drawHuman called with null block!');
            return;
        }
        
        const floatType = block.floatType || 'raft';
        const floatHeight = block.height * 0.4; // 40% for the float (at bottom of block)
        const peopleHeight = block.height * 0.6; // 60% for people (on top of float)
        const floatY = block.y + (block.height - floatHeight); // Float at bottom of block
        
        // Draw the float device (boat/raft/mattress) at bottom FIRST
        this.drawFloat(block, floatHeight);
        
        // Draw people standing ON TOP of the float
        const peopleY = block.y; // People start at top of block (above float)
        const peopleCount = block.peopleCount || 1;
        const personWidth = block.width / peopleCount;
        
        // --- NEW: Scale people size based on level ---
        // Start at full size (1.0) on level 1, and get 10% smaller each level, down to a minimum of 50% size.
        const scale = Math.max(0.5, 1.0 - (this.level - 1) * 0.1);
        const scaledPersonHeight = peopleHeight * scale;
        const scaledPersonWidth = personWidth * scale;
        // Adjust Y position to keep feet on the float
        const scaledPeopleY = peopleY + (peopleHeight - scaledPersonHeight);
        
        for (let i = 0; i < peopleCount; i++) {
            const personX = block.x + (i * personWidth) + (personWidth - scaledPersonWidth) / 2; // Center scaled person
            // Pass the isHero flag to the drawPerson function
            this.drawPerson(personX, scaledPeopleY, scaledPersonWidth, scaledPersonHeight, block.scared, isMoving, block.isHero);
        }
        
        // Name tag
        if (block.hasName) {
            this.ctx.fillStyle = 'rgba(255,255,255,0.9)';
            this.ctx.font = '10px Arial';
            this.ctx.fontWeight = 'bold';
            this.ctx.fillText(block.name, block.x + 5, block.y - 5);
        }
        
        // Float type indicator
        if (isMoving) {
            this.ctx.fillStyle = 'rgba(255,255,255,0.6)';
            this.ctx.font = '8px Arial';
            const label = floatType === 'boat' ? '🚤' : floatType === 'mattress' ? '🛟' : '🪵';
            this.ctx.fillText(label, block.x + 2, block.y + block.height - 2);
        }
    },
    
    drawFloat(block, floatHeight) {
        if (!block) return;
        
        const floatY = block.y + (block.height - floatHeight);
        const floatType = block.floatType || 'raft';
        
        // Choose VERY BRIGHT, HIGHLY VISIBLE colors based on type
        let floatColor;
        if (floatType === 'boat') {
            floatColor = '#A0522D'; // BRIGHT SADDLE BROWN - VERY VISIBLE
        } else if (floatType === 'mattress') {
            floatColor = '#FF4500'; // BRIGHT ORANGE RED - IMPOSSIBLE TO MISS
        } else {
            floatColor = '#DEB887'; // BRIGHT BURLY WOOD - VERY VISIBLE
        }
        
        // Draw boat shape (trapezoid) - LARGER and MORE VISIBLE
        if (floatType === 'boat') {
            this.ctx.fillStyle = floatColor;
            this.ctx.beginPath();
            this.ctx.moveTo(block.x + 5, floatY);
            this.ctx.lineTo(block.x + block.width - 5, floatY);
            this.ctx.lineTo(block.x + block.width, floatY + floatHeight);
            this.ctx.lineTo(block.x, floatY + floatHeight);
            this.ctx.closePath();
            this.ctx.fill();
            
            // Boat outline - THICKER and MORE VISIBLE
            this.ctx.strokeStyle = '#654321';
            this.ctx.lineWidth = 3;
            this.ctx.stroke();
            
            // Boat details - make it look like a boat
            this.ctx.strokeStyle = '#5a3521';
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.moveTo(block.x + block.width * 0.2, floatY + floatHeight * 0.5);
            this.ctx.lineTo(block.x + block.width * 0.8, floatY + floatHeight * 0.5);
            this.ctx.stroke();
        }
        // Draw raft (rectangle with logs) - BRIGHTER
        else if (floatType === 'raft') {
            // Main raft body - BRIGHT BROWN
            this.ctx.fillStyle = floatColor;
            this.ctx.fillRect(block.x, floatY, block.width, floatHeight);
            
            // Outline - VISIBLE
            this.ctx.strokeStyle = '#8B4513';
            this.ctx.lineWidth = 3;
            this.ctx.strokeRect(block.x, floatY, block.width, floatHeight);
            
            // Log lines - VISIBLE
            this.ctx.strokeStyle = '#654321';
            this.ctx.lineWidth = 2;
            const logCount = 4;
            for (let i = 1; i < logCount; i++) {
                const logX = block.x + (block.width / logCount) * i;
                this.ctx.beginPath();
                this.ctx.moveTo(logX, floatY);
                this.ctx.lineTo(logX, floatY + floatHeight);
                this.ctx.stroke();
            }
        }
        // Draw air mattress (rounded rectangle) - BRIGHT ORANGE
        else {
            // Main mattress - BRIGHT ORANGE
            this.ctx.fillStyle = floatColor;
            const radius = 6;
            this.ctx.beginPath();
            this.ctx.moveTo(block.x + radius, floatY);
            this.ctx.lineTo(block.x + block.width - radius, floatY);
            this.ctx.arcTo(block.x + block.width, floatY, block.x + block.width, floatY + radius, radius);
            this.ctx.lineTo(block.x + block.width, floatY + floatHeight - radius);
            this.ctx.arcTo(block.x + block.width, floatY + floatHeight, block.x + block.width - radius, floatY + floatHeight, radius);
            this.ctx.lineTo(block.x + radius, floatY + floatHeight);
            this.ctx.arcTo(block.x, floatY + floatHeight, block.x, floatY + floatHeight - radius, radius);
            this.ctx.lineTo(block.x, floatY + radius);
            this.ctx.arcTo(block.x, floatY, block.x + radius, floatY, radius);
            this.ctx.closePath();
            this.ctx.fill();
            
            // Outline
            this.ctx.strokeStyle = '#CC4A2F';
            this.ctx.lineWidth = 3;
            this.ctx.stroke();
            
            // Shine effect - MORE VISIBLE
            this.ctx.fillStyle = 'rgba(255,255,255,0.5)';
            this.ctx.fillRect(block.x + 4, floatY + 3, block.width - 8, floatHeight / 3);
        }
    },
    
    drawPerson(x, y, width, height, scared, isMoving, isHero = false) {
        // Make people MUCH more visible
        let bodyColor = isHero ? '#f9ca24' : (scared ? '#ff0000' : '#ff3366'); // Hero is YELLOW
        const headSize = Math.max(width * 0.55, height * 0.4); // EVEN BIGGER HEAD - MORE VISIBLE
        const bodyHeight = height - headSize;
        const personCenterX = x + width/2;
        const headY = y;
        const headCenterY = y + headSize/2;
        
        // Head - BRIGHT SKIN TONE with OUTLINE
        this.ctx.fillStyle = '#ffdbac';
        this.ctx.beginPath();
        this.ctx.arc(personCenterX, headCenterY, headSize/2, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Head outline - VISIBLE
        this.ctx.strokeStyle = '#d4a574';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        
        // Body (shirt) - BRIGHT COLOR
        this.ctx.fillStyle = bodyColor;
        this.ctx.fillRect(x + width * 0.2, y + headSize * 0.8, width * 0.6, bodyHeight * 0.7);
        
        // Body outline
        this.ctx.strokeStyle = scared ? '#cc3542' : '#cc5055';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(x + width * 0.2, y + headSize * 0.8, width * 0.6, bodyHeight * 0.7);
        
        // Arms - THICKER and MORE VISIBLE
        this.ctx.strokeStyle = bodyColor;
        this.ctx.lineWidth = Math.max(3, width * 0.12);
        this.ctx.lineCap = 'round';
        
        if (scared && isMoving) {
            // Arms up reaching - DESPERATE
            this.ctx.beginPath();
            this.ctx.moveTo(personCenterX - width * 0.15, y + headSize * 0.9);
            this.ctx.lineTo(personCenterX - width * 0.35, y + headSize * 0.3);
            this.ctx.moveTo(personCenterX + width * 0.15, y + headSize * 0.9);
            this.ctx.lineTo(personCenterX + width * 0.35, y + headSize * 0.3);
            this.ctx.stroke();
        } else {
            // Arms at sides
            this.ctx.beginPath();
            this.ctx.moveTo(personCenterX - width * 0.15, y + headSize * 0.9);
            this.ctx.lineTo(personCenterX - width * 0.25, y + headSize * 1.3);
            this.ctx.moveTo(personCenterX + width * 0.15, y + headSize * 0.9);
            this.ctx.lineTo(personCenterX + width * 0.25, y + headSize * 1.3);
            this.ctx.stroke();
        }
        
        // Face - BIGGER and MORE VISIBLE
        const eyeSize = Math.max(3, headSize * 0.2); // BIGGER EYES
        const eyeY = headCenterY - headSize * 0.15;
        const eyeSpacing = headSize * 0.25;
        
        // Eyes - WHITE FIRST then BLACK
        this.ctx.fillStyle = '#ffffff';
        this.ctx.beginPath();
        this.ctx.arc(personCenterX - eyeSpacing, eyeY, eyeSize * 0.8, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(personCenterX + eyeSpacing, eyeY, eyeSize * 0.8, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Pupils - BIG BLACK DOTS
        this.ctx.fillStyle = '#000000';
        this.ctx.beginPath();
        this.ctx.arc(personCenterX - eyeSpacing, eyeY, eyeSize * 0.5, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(personCenterX + eyeSpacing, eyeY, eyeSize * 0.5, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Mouth - VISIBLE
        const mouthY = headCenterY + headSize * 0.25;
        if (scared) {
            // O mouth (scared) - BIG OPEN MOUTH
            this.ctx.fillStyle = '#000000';
            this.ctx.beginPath();
            this.ctx.arc(personCenterX, mouthY, eyeSize * 1.2, 0, Math.PI * 2);
            this.ctx.fill();
        } else {
            // Small smile - VISIBLE CURVE
            this.ctx.strokeStyle = '#000000';
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.arc(personCenterX, mouthY, eyeSize * 0.8, 0.2, Math.PI - 0.2);
            this.ctx.stroke();
        }
    },
    
    drawMenu() {
        const width = config.canvas.width;
        const height = config.canvas.height;
        
        // Background gradient
        const gradient = this.ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#0f3460');
        gradient.addColorStop(1, '#1a1a2e');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, width, height);
        
        // Water at bottom
        this.ctx.fillStyle = config.colors.water;
        this.ctx.fillRect(0, height - 100, width, 100);
        
        // Title
        this.ctx.fillStyle = '#4ecca3';
        this.ctx.font = 'bold 64px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 4;
        this.ctx.strokeText('THE RISING', width / 2, height * 0.25);
        this.ctx.fillText('THE RISING', width / 2, height * 0.25);
        
        // Subtitle
        this.ctx.fillStyle = '#fff';
        this.ctx.font = '24px Arial';
        this.ctx.fillText('Stack the living. Remember the dead.', width / 2, height * 0.35);
        
        // Start instruction (pulsing)
        const alpha = Math.sin(Date.now() * 0.003) * 0.3 + 0.7;
        this.ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        this.ctx.font = 'bold 32px Arial';
        this.ctx.fillText('PRESS ENTER TO START', width / 2, height * 0.55);
        
        // Controls
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        this.ctx.font = '18px Arial';
        this.ctx.fillText('CONTROLS:', width / 2, height * 0.68);
        this.ctx.fillText('ENTER/SPACE - Place block', width / 2, height * 0.73);
        this.ctx.fillText('ESC/P - Pause', width / 2, height * 0.78);
        this.ctx.fillText('R - Restart', width / 2, height * 0.83);
        
        // Wave emoji
        this.ctx.font = '48px Arial';
        this.ctx.fillText('🌊', width / 2, height * 0.92);
    },
    
    drawPausedOverlay() {
        const width = config.canvas.width;
        const height = config.canvas.height;
        
        // Semi-transparent overlay
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, width, height);
        
        // Paused text
        this.ctx.fillStyle = '#fff';
        this.ctx.font = 'bold 64px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 4;
        this.ctx.strokeText('PAUSED', width / 2, height * 0.4);
        this.ctx.fillText('PAUSED', width / 2, height * 0.4);
        
        // Instructions
        this.ctx.font = '24px Arial';
        this.ctx.fillText('ESC or P - Resume', width / 2, height * 0.55);
        this.ctx.fillText('R - Restart', width / 2, height * 0.62);
    },
    
    gameLoop() {
        try {
            this.update();
            this.draw();
            
            // Draw paused overlay on top if paused
            if (this.state === 'paused') {
                this.drawPausedOverlay();
            }
        } catch (e) {
            console.error('Error in gameLoop:', e);
            const msg = document.getElementById('message');
            if (msg) {
                msg.textContent = 'LOOP ERROR: ' + (e && e.message ? e.message : e);
                msg.classList.add('show');
            }
            // Stop the loop on error
            return;
        }
        
        requestAnimationFrame(() => this.gameLoop());
    },
    
    updateUI() {
        document.getElementById('level').textContent = `LEVEL ${this.level}`;
        document.getElementById('survivors').textContent = `SURVIVORS: ${this.survivors}/${this.totalPeople}`;
    },
    
    showMessage(text) {
        const msg = document.getElementById('message');
        msg.innerHTML = text.replace('\n', '<br>');
        msg.classList.add('show');
    },
    
    hideMessage() {
        document.getElementById('message').classList.remove('show');
    }
};

// Start game when page loads, with visible error reporting
window.addEventListener('load', () => {
    try {
        game.init();
    } catch (e) {
        console.error('Error during game.init:', e);
        const msg = document.getElementById('message');
        if (msg) {
            msg.textContent = 'INIT ERROR: ' + (e && e.message ? e.message : e);
            msg.classList.add('show');
        }
    }
});

