<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Spanish Vocab Master</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;900&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Poppins', sans-serif;
        }
        .fade-in {
            animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .shake {
            animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes shake {
            10%, 90% { transform: translate3d(-1px, 0, 0); }
            20%, 80% { transform: translate3d(2px, 0, 0); }
            30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
            40%, 60% { transform: translate3d(4px, 0, 0); }
        }
        /* Custom Scrollbar */
        ::-webkit-scrollbar {
            width: 8px;
        }
        ::-webkit-scrollbar-track {
            background: #f1f1f1; 
        }
        ::-webkit-scrollbar-thumb {
            background: #cbd5e1; 
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #94a3b8; 
        }
        /* Style for the answer options */
        .mc-option {
            transition: all 0.2s;
            cursor: pointer;
        }
        .mc-option:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
        }
        .correct {
            border-color: #10b981 !important; /* Tailwind teal-500 */
            background-color: #e6fffa !important; /* Tailwind teal-50 */
        }
        .incorrect {
            border-color: #ef4444 !important; /* Tailwind red-500 */
            background-color: #fee2e2 !important; /* Tailwind red-50 */
        }
        .revealed-correct {
            border-color: #2563eb !important; /* Tailwind blue-600 */
            background-color: #eff6ff !important; /* Tailwind blue-50 */
        }
        
        .unit-card {
            transition: all 0.2s ease-in-out;
        }
        .unit-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
    </style>
</head>
<body class="bg-slate-50 text-slate-800 h-screen flex flex-col items-center justify-center p-4">

    <!-- Main Container -->
    <div class="w-full max-w-lg bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 relative flex flex-col h-full max-h-[95vh]">
        
        <!-- Header / Progress -->
        <div id="header-section" class="bg-indigo-600 p-4 text-white hidden flex-shrink-0">
            <div class="flex justify-between items-center mb-2">
                <!-- Back Button -->
                <button onclick="handleGameScreenBack()" class="p-1 rounded-full hover:bg-indigo-700 transition-colors">
                    <i class="fas fa-arrow-left text-lg"></i>
                </button>
                <span class="font-bold text-lg flex-grow text-center" id="header-title">
                    <i class="fas fa-layer-group mr-2"></i>Vocab Quiz
                </span>
                <div class="flex items-center space-x-4">
                    <span class="bg-indigo-500 px-3 py-1 rounded-full text-sm font-medium">
                        <i class="fas fa-fire text-orange-400 mr-1"></i> <span id="streak-display">0</span>
                    </span>
                    <span class="font-semibold text-indigo-100" id="score-display">0/0</span>
                </div>
            </div>
            <!-- Progress Bar -->
            <div class="w-full bg-indigo-800 rounded-full h-2 mt-2">
                <div id="progress-bar" class="bg-teal-400 h-2 rounded-full transition-all duration-300" style="width: 0%"></div>
            </div>
        </div>

        <!-- Screens -->
        <div class="flex-grow flex flex-col relative overflow-hidden min-h-0">
            
            <!-- 1. Level Selection Screen -->
            <div id="level-screen" class="absolute inset-0 p-8 flex flex-col justify-center items-center bg-white z-30 fade-in overflow-y-auto">
                <div class="bg-indigo-100 p-6 rounded-full mb-6 text-indigo-600 flex-shrink-0">
                    <i class="fas fa-graduation-cap text-5xl"></i>
                </div>
                <h1 class="text-3xl font-bold mb-2 text-slate-800 flex-shrink-0 text-center">Spanish Master</h1>
                <p class="text-slate-500 mb-8 text-center text-sm flex-shrink-0">Select your level to begin.</p>
                
                <div class="space-y-4 w-full max-w-xs flex-shrink-0">
                    <button onclick="selectLevel(9)" class="w-full bg-white border-2 border-indigo-100 hover:border-indigo-500 hover:shadow-md p-4 rounded-2xl flex items-center transition-all group">
                        <div class="bg-indigo-100 text-indigo-600 p-3 rounded-xl mr-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                            <span class="font-bold text-xl">9</span>
                        </div>
                        <div class="text-left">
                            <h3 class="font-bold text-slate-800 text-lg">Nivel 9</h3>
                            <p class="text-slate-500 text-xs">Intermediate Vocabulary</p>
                        </div>
                        <i class="fas fa-chevron-right ml-auto text-slate-300 group-hover:text-indigo-500"></i>
                    </button>

                    <button onclick="selectLevel(10)" class="w-full bg-white border-2 border-indigo-100 hover:border-indigo-500 hover:shadow-md p-4 rounded-2xl flex items-center transition-all group">
                        <div class="bg-purple-100 text-purple-600 p-3 rounded-xl mr-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                            <span class="font-bold text-xl">10</span>
                        </div>
                        <div class="text-left">
                            <h3 class="font-bold text-slate-800 text-lg">Nivel 10</h3>
                            <p class="text-slate-500 text-xs">Advanced Storytelling</p>
                        </div>
                        <i class="fas fa-chevron-right ml-auto text-slate-300 group-hover:text-purple-500"></i>
                    </button>
                </div>
            </div>

            <!-- 2. Unit Selection Screen (Icon Grid) -->
            <div id="unit-screen" class="absolute inset-0 flex flex-col bg-white z-20 hidden fade-in">
                <div class="bg-white p-6 border-b border-slate-100 flex items-center justify-between flex-shrink-0">
                    <button onclick="showLevelScreen()" class="text-slate-400 hover:text-indigo-600 transition-colors">
                        <i class="fas fa-arrow-left text-lg"></i>
                    </button>
                    <h2 class="font-bold text-xl text-slate-800" id="unit-screen-title">Select Unit</h2>
                    <div class="w-6"></div> <!-- Spacer -->
                </div>
                
                <div class="p-6 overflow-y-auto flex-grow bg-slate-50">
                    <div id="unit-grid" class="grid grid-cols-2 gap-4">
                        <!-- Unit Cards Injected Here -->
                    </div>
                    <!-- All Units Challenge Button -->
                    <div class="mt-6">
                        <button onclick="selectAllUnitsChallenge()" class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center">
                            <i class="fas fa-trophy text-yellow-300 text-xl mr-3"></i>
                            <div>
                                <span class="block text-lg leading-none">All Units Challenge</span>
                                <span class="text-xs font-normal opacity-80">Test across all topics!</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            <!-- 3. Main Menu Screen (For a selected unit) -->
            <div id="start-screen" class="absolute inset-0 p-8 flex flex-col justify-center items-center bg-white z-20 hidden fade-in overflow-y-auto">
                <button onclick="showUnitScreen()" class="absolute top-6 left-6 text-slate-400 hover:text-indigo-600 transition-colors">
                    <i class="fas fa-arrow-left text-lg"></i>
                </button>

                <div class="bg-indigo-50 p-6 rounded-full mb-4 text-indigo-600 flex-shrink-0" id="selected-unit-icon">
                    <!-- Icon injected -->
                </div>
                <h1 class="text-2xl font-bold mb-2 text-slate-800 flex-shrink-0 text-center" id="selected-unit-title">Unit Title</h1>
                <p class="text-slate-500 mb-8 text-center text-sm flex-shrink-0">Ready to practice?</p>
                
                <div class="space-y-3 w-full max-w-xs flex-shrink-0">
                    <button onclick="quickStartGame()" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-lg shadow-indigo-200 flex items-center justify-center">
                        <i class="fas fa-play mr-2"></i> Quick Start (10)
                    </button>
                    
                    <button onclick="showConfigScreen()" class="w-full bg-white border-2 border-indigo-100 text-indigo-600 hover:bg-indigo-50 font-bold py-3 px-6 rounded-xl transition-colors flex justify-center items-center">
                        <i class="fas fa-sliders-h mr-2"></i> Configure
                    </button>

                    <button onclick="showListScreen()" class="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-3 px-6 rounded-xl transition-colors flex justify-center items-center">
                        <i class="fas fa-list-ul mr-2"></i> Study List
                    </button>
                </div>
            </div>

            <!-- 4. Nivel 10 Blank Screen (REMOVED - Replaced with Unit Selection for L10) -->

            <!-- 5. Configuration Screen -->
            <div id="config-screen" class="absolute inset-0 flex flex-col bg-white z-20 hidden fade-in">
                <div class="bg-indigo-600 text-white p-4 flex justify-between items-center flex-shrink-0">
                    <button onclick="showStartScreen()" class="text-white hover:text-indigo-200 font-medium">
                        <i class="fas fa-arrow-left mr-2"></i> Back
                    </button>
                    <h2 class="font-bold text-lg">Quiz Settings</h2>
                    <div></div> 
                </div>
                <div class="p-6 flex flex-col flex-grow overflow-y-auto">
                    <!-- QUIZ LENGTH -->
                    <div class="w-full mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200 flex-shrink-0">
                        <h3 class="text-sm font-bold text-slate-600 mb-3 uppercase tracking-wider text-center">Quiz Length</h3>
                        <select id="quiz-length-select" class="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-700 focus:ring-indigo-500 focus:border-indigo-500">
                            <option value="10">10 Questions (Quick)</option>
                            <option value="25">25 Questions (Challenge)</option>
                            <option value="999">All Vocab</option>
                        </select>
                    </div>
                    <!-- MODE SELECTION -->
                    <div class="w-full mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200 flex-shrink-0">
                        <h3 class="text-sm font-bold text-slate-600 mb-3 uppercase tracking-wider text-center">Quiz Mode</h3>
                        <div class="flex space-x-4 justify-center">
                            <label class="flex items-center space-x-2 cursor-pointer">
                                <input type="radio" name="quiz-mode" value="spelling" checked class="text-indigo-600 focus:ring-indigo-500 rounded-full">
                                <span class="text-sm text-slate-700 font-medium">Spelling</span>
                            </label>
                            <label class="flex items-center space-x-2 cursor-pointer">
                                <input type="radio" name="quiz-mode" value="multiple-choice" class="text-indigo-600 focus:ring-indigo-500 rounded-full">
                                <span class="text-sm text-slate-700 font-medium">Multiple Choice</span>
                            </label>
                        </div>
                    </div>
                    <!-- CATEGORY SELECTION -->
                    <div class="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 flex-grow flex flex-col min-h-[150px]">
                        <h3 class="text-sm font-bold text-slate-600 mb-3 uppercase tracking-wider flex-shrink-0">Select Categories</h3>
                        <div id="category-selector" class="grid grid-cols-2 gap-y-3 gap-x-4 text-sm flex-grow overflow-y-auto pr-2"></div>
                        <div class="mt-4 pt-3 border-t border-slate-200 flex-shrink-0">
                            <label class="flex items-center space-x-2 text-indigo-600 cursor-pointer">
                                <input type="checkbox" id="select-all-categories" checked class="text-indigo-600 focus:ring-indigo-500 rounded">
                                <span class="text-sm font-semibold">Select All</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="p-6 pt-0 flex-shrink-0">
                    <button onclick="applyConfigAndStartGame()" class="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-teal-200 transition-all transform active:scale-95">
                        Start Quiz <i class="fas fa-arrow-right ml-2"></i>
                    </button>
                </div>
            </div>

            <!-- 6. Study List Screen -->
            <div id="list-screen" class="absolute inset-0 flex flex-col bg-white z-20 hidden fade-in">
                <div class="bg-slate-50 border-b border-slate-200 p-4 flex justify-between items-center flex-shrink-0">
                    <h2 class="font-bold text-lg text-slate-700">Vocabulary List</h2>
                    <button onclick="showStartScreen()" class="text-indigo-600 font-medium hover:text-indigo-800">
                        Close <i class="fas fa-times ml-1"></i>
                    </button>
                </div>
                <div id="vocab-list-container" class="flex-grow overflow-y-auto p-4 space-y-6"></div>
            </div>

            <!-- 7. Game Screen -->
            <div id="game-screen" class="hidden flex-col h-full overflow-hidden fade-in p-6">
                <div class="text-center mt-2 flex-shrink-0 min-h-[5rem]">
                    <p class="text-sm text-slate-400 font-medium uppercase tracking-wider mb-2">Translate to Spanish</p>
                    <h2 id="question-word" class="text-2xl font-bold text-indigo-900 leading-tight min-h-[3rem] flex items-center justify-center">Hello</h2>
                </div>
                <div id="answer-area" class="w-full flex-grow flex flex-col justify-center mb-4 overflow-y-auto min-h-0">
                    <div id="spelling-mode-container" class="flex flex-col justify-center">
                        <div class="flex justify-center mb-4">
                            <button id="hint-btn" onclick="showHint()" class="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-full text-sm transition-colors shadow-md shadow-orange-200 flex items-center">
                                <i class="fas fa-lightbulb mr-2"></i> Hint
                            </button>
                        </div>
                        <div class="relative">
                            <input type="text" id="answer-input" onkeyup="handleEnter(event)" class="w-full bg-slate-50 border-2 border-slate-200 text-slate-800 text-lg font-medium rounded-xl p-4 text-center focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all placeholder-slate-300" placeholder="Type translation..." autocomplete="off">
                            <div id="feedback-icon" class="hidden absolute right-4 top-1/2 transform -translate-y-1/2 text-xl"></div>
                        </div>
                        <div class="flex justify-center flex-wrap gap-2 mt-4" id="accent-keys">
                            <button onclick="addChar('á')" class="bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold py-2 px-3 rounded-lg transition-colors border border-slate-200">á</button>
                            <button onclick="addChar('é')" class="bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold py-2 px-3 rounded-lg transition-colors border border-slate-200">é</button>
                            <button onclick="addChar('í')" class="bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold py-2 px-3 rounded-lg transition-colors border border-slate-200">í</button>
                            <button onclick="addChar('ó')" class="bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold py-2 px-3 rounded-lg transition-colors border border-slate-200">ó</button>
                            <button onclick="addChar('ú')" class="bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold py-2 px-3 rounded-lg transition-colors border border-slate-200">ú</button>
                            <button onclick="addChar('ñ')" class="bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold py-2 px-3 rounded-lg transition-colors border border-slate-200">ñ</button>
                        </div>
                        <div id="message-area" class="h-16 mt-4 flex items-center justify-center text-center font-medium"></div>
                    </div>
                    <div id="mc-mode-container" class="hidden flex flex-col space-y-3 pt-4"></div>
                    
                    <!-- NEW: Confidence Rating Container (Initially Hidden) -->
                    <div id="confidence-container" class="hidden mt-4 pt-4 border-t border-slate-200">
                        <p class="text-sm font-bold text-slate-500 uppercase text-center mb-3">How confident were you?</p>
                        <div class="flex justify-between gap-2">
                            <button onclick="rateConfidence(1)" class="flex-1 bg-red-100 hover:bg-red-200 text-red-600 font-bold py-3 rounded-lg text-sm transition-colors border border-red-200">1</button>
                            <button onclick="rateConfidence(2)" class="flex-1 bg-orange-100 hover:bg-orange-200 text-orange-600 font-bold py-3 rounded-lg text-sm transition-colors border border-orange-200">2</button>
                            <button onclick="rateConfidence(3)" class="flex-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-600 font-bold py-3 rounded-lg text-sm transition-colors border border-yellow-200">3</button>
                            <button onclick="rateConfidence(4)" class="flex-1 bg-lime-100 hover:bg-lime-200 text-lime-600 font-bold py-3 rounded-lg text-sm transition-colors border border-lime-200">4</button>
                            <button onclick="rateConfidence(5)" class="flex-1 bg-green-100 hover:bg-green-200 text-green-600 font-bold py-3 rounded-lg text-sm transition-colors border border-green-200">5</button>
                        </div>
                    </div>
                </div>
                <div class="w-full mt-auto flex-shrink-0 pb-2">
                    <div class="mt-2" id="action-buttons-container">
                        <button id="submit-btn" onclick="checkAnswer()" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-200 transition-all transform active:scale-95">Check Answer</button>
                        <!-- Note: Next Button now typically triggered by Confidence Rating if in Confidence Mode, but kept for fallback/skipping logic if needed, though we will hide it until rated -->
                        <button id="next-btn" onclick="nextQuestion()" class="hidden w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-teal-200 transition-all transform active:scale-95">Next Question <i class="fas fa-arrow-right ml-2"></i></button>
                    </div>
                </div>
            </div>

            <!-- 8. Result Screen -->
            <div id="result-screen" class="hidden text-center fade-in absolute inset-0 bg-white p-8 flex flex-col justify-center items-center z-10 overflow-y-auto">
                <div id="result-emoji" class="text-6xl mb-4">🎉</div>
                <h2 class="text-3xl font-bold text-slate-800 mb-2">Quiz Complete!</h2>
                <p class="text-slate-500 mb-6">Here is how you did:</p>
                <div class="grid grid-cols-2 gap-4 w-full mb-8">
                    <div class="bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
                        <div class="text-3xl font-bold text-indigo-600" id="final-score">0</div>
                        <div class="text-xs text-indigo-400 uppercase font-bold tracking-wide">Score</div>
                    </div>
                    <div class="bg-orange-50 p-4 rounded-2xl border border-orange-100">
                        <div class="text-3xl font-bold text-orange-500" id="final-accuracy">0%</div>
                        <div class="text-xs text-orange-400 uppercase font-bold tracking-wide">Accuracy</div>
                    </div>
                </div>
                <div class="w-full space-y-3">
                    <button onclick="resetGame()" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg">Play Again</button>
                    <button onclick="showStartScreen()" class="w-full text-slate-500 hover:text-indigo-600 font-medium py-3 transition-colors">Back to Menu</button>
                </div>
            </div>

        </div>
    </div>

    <!-- Footer -->
    <div class="mt-4 text-center text-slate-400 text-sm">
        <p>Tip: In spelling mode, **Hint** reveals letter by letter. Press **Enter** to submit.</p>
    </div>

    <script>
        // --- Multi-Unit Data Structure ---
        const level9Data = {
            "Ciudades": {
                icon: "fa-city",
                data: {
                    "Adjetivos: Positivos": [
                        { en: "beautiful / lovely", es: ["preciosa", "precioso"] }, 
                        { en: "well looked-after", es: ["cuidada", "cuidado"] }, 
                        { en: "clean", es: ["limpia", "limpio"] }, 
                        { en: "grand / full of monuments", es: ["monumental"] },
                        { en: "calm / peaceful", es: ["tranquila", "tranquilo"] }, 
                        { en: "traditional", es: ["tradicional"] },
                        { en: "artistic", es: ["artística", "artístico"] }, 
                        { en: "historic", es: ["histórica", "histórico"] }, 
                        { en: "well preserved", es: ["bien conservada", "bien conservado", "conservada", "conservado"] }, 
                        { en: "cosmopolitan / international", es: ["cosmopolita"] },
                        { en: "lively / vibrant", es: ["viva", "vivo", "vibrante"] },
                        { en: "special", es: ["especial"] },
                        { en: "well organised", es: ["bien organizada", "bien organizado", "organizada", "organizado"] }, 
                        { en: "open-minded / open", es: ["abierta", "abierto"] } 
                    ],
                    "Adjetivos: Negativos": [
                        { en: "horrible", es: ["horrible"] },
                        { en: "messy / disorganised", es: ["desordenada", "desordenado", "desorganizada", "desorganizado"] }, 
                        { en: "dirty", es: ["sucia", "sucio"] }, 
                        { en: "noisy", es: ["ruidosa", "ruidoso"] }, 
                        { en: "boring", es: ["aburrida", "aburrido"] }, 
                        { en: "polluted", es: ["contaminada", "contaminado"] }, 
                        { en: "run-down / decaying", es: ["decadente"] },
                        { en: "badly preserved", es: ["mal conservada", "mal conservado"] }, 
                        { en: "dangerous", es: ["peligrosa", "peligroso"] }, 
                        { en: "closed / narrow-minded", es: ["cerrada", "cerrado"] } 
                    ],
                    "Adjetivos: Neutrales": [
                        { en: "human / people-focused", es: ["humana", "humano"] }, 
                        { en: "cheerful / lively", es: ["alegre"] },
                        { en: "old / traditional", es: ["antigua", "antiguo"] }, 
                        { en: "urban", es: ["urbana", "urbano"] } 
                    ],
                    "Vocabulario Clave": [
                        { en: "traffic", es: ["el tráfico", "tráfico"] },
                        { en: "overpopulation", es: ["la superpoblación", "superpoblación"] },
                        { en: "coexistence", es: ["la convivencia", "convivencia"] },
                        { en: "chaos", es: ["el caos", "caos"] },
                        { en: "pollution", es: ["la contaminación", "contaminación"] },
                        { en: "atmosphere / vibe", es: ["el ambiente", "ambiente"] },
                        { en: "aggressive side", es: ["la parte agresiva"] },
                        { en: "awake city / always active", es: ["ciudad despierta"] },
                        { en: "never sleeps", es: ["no duerme"] },
                        { en: "to connect with others", es: ["relacionarse"] },
                        { en: "to have a few glasses of wine", es: ["tomar unos vinos"] },
                        { en: "the bar on the corner", es: ["el bar de la esquina"] },
                        { en: "neighbourhood", es: ["barrio", "el barrio"] },
                        { en: "welcoming", es: ["acogedora", "acogedor"] }
                    ],
                    "Expresiones: Opiniones": [
                        { en: "In my opinion...", es: ["en mi opinión"] },
                        { en: "I think that...", es: ["creo que"] },
                        { en: "It seems to me that...", es: ["me parece que"] },
                        { en: "From my point of view...", es: ["desde mi punto de vista"] },
                        { en: "I agree", es: ["estoy de acuerdo"] },
                        { en: "You're right", es: ["tienes razón"] },
                        { en: "I share your opinion", es: ["comparto tu opinión"] },
                        { en: "I disagree", es: ["no estoy de acuerdo"] },
                        { en: "I don't see it that way", es: ["no lo veo así"] },
                        { en: "I think you're mistaken", es: ["creo que te equivocas"] }
                    ],
                    "Expresiones: Contraste": [
                        { en: "On one hand...", es: ["por un lado", "por una parte"] },
                        { en: "On the other hand...", es: ["por otro lado", "por otra parte"] },
                        { en: "Despite...", es: ["a pesar de"] },
                        { en: "Although / even though...", es: ["aunque"] },
                        { en: "However / nevertheless...", es: ["sin embargo"] }
                    ],
                    "Frases Útiles": [
                        { en: "What I like most is...", es: ["lo que más me gusta es"] },
                        { en: "It's a welcoming city", es: ["es una ciudad acogedora"] },
                        { en: "It has a warm atmosphere", es: ["tiene un ambiente muy cálido"] },
                        { en: "It's very cosmopolitan", es: ["es muy cosmopolita"] },
                        { en: "The worst thing is...", es: ["lo peor de la ciudad es", "lo peor es"] },
                        { en: "It's too noisy", es: ["es demasiado ruidosa", "es demasiado ruidoso"] },
                        { en: "There are too many people", es: ["hay demasiada gente"] },
                        { en: "The traffic is unbearable", es: ["el tráfico es insoportable"] },
                        { en: "It has good and bad things", es: ["tiene cosas buenas y malas"] },
                        { en: "It's a city that never sleeps", es: ["es una ciudad que nunca duerme"] }
                    ],
                    "Estructuras": [
                        { en: "The good thing is that...", es: ["lo bueno es que"] },
                        { en: "The bad thing is that...", es: ["lo malo es que"] },
                        { en: "It's a city where...", es: ["es una ciudad donde"] },
                        { en: "It's a place in which...", es: ["es un lugar en el que"] }
                    ]
                }
            },
            "Tecnología": {
                icon: "fa-laptop",
                data: {
                    "Dispositivos": [
                        { en: "computer", es: ["el ordenador", "la computadora"] },
                        { en: "laptop", es: ["el portátil"] },
                        { en: "tablet", es: ["la tableta"] },
                        { en: "mobile phone", es: ["el móvil", "el celular"] },
                        { en: "screen", es: ["la pantalla"] },
                        { en: "keyboard", es: ["el teclado"] },
                        { en: "mouse", es: ["el ratón"] },
                        { en: "headphones", es: ["los auriculares"] },
                        { en: "camera / webcam", es: ["la cámara", "la webcam"] },
                        { en: "microphone", es: ["el micrófono"] },
                        { en: "plug", es: ["el enchufe"] },
                        { en: "charger", es: ["el cargador"] },
                        { en: "battery", es: ["la batería"] },
                        { en: "hard drive", es: ["el disco duro"] },
                        { en: "USB stick", es: ["la memoria USB"] },
                        { en: "cable", es: ["el cable"] }
                    ],
                    "Conectividad": [
                        { en: "wifi / network", es: ["el wifi", "la red"] },
                        { en: "the cloud", es: ["la nube"] },
                        { en: "website", es: ["la página web", "el sitio web"] },
                        { en: "email", es: ["el correo electrónico"] },
                        { en: "app", es: ["la aplicación", "la app"] },
                        { en: "password", es: ["la contraseña"] },
                        { en: "link", es: ["el enlace"] }
                    ],
                    "Acciones": [
                        { en: "to browse the internet", es: ["navegar por internet"] },
                        { en: "to click", es: ["hacer clic", "pinchar"] },
                        { en: "to download", es: ["descargar"] },
                        { en: "to upload", es: ["subir"] },
                        { en: "to share", es: ["compartir"] },
                        { en: "to save", es: ["guardar"] },
                        { en: "to delete", es: ["borrar"] },
                        { en: "to log in", es: ["iniciar sesión"] },
                        { en: "to attach", es: ["adjuntar"] }
                    ],
                    "Frases Útiles": [
                        { en: "I'm online", es: ["estoy en línea"] },
                        { en: "I need to log in", es: ["tengo que iniciar sesión"] },
                        { en: "Close the screen", es: ["cierra la pantalla"] },
                        { en: "Turn on the computer", es: ["enciende el ordenador"] },
                        { en: "Save and close the file", es: ["guarda y cierra el archivo"] },
                        { en: "Attach the file and send it", es: ["adjunta el documento y envíalo"] },
                        { en: "Download the app", es: ["descarga la aplicación"] },
                        { en: "I forgot my password", es: ["olvidé mi contraseña"] },
                        { en: "My computer is slow", es: ["mi ordenador va lento"] },
                        { en: "There's no connection", es: ["no hay conexión"] }
                    ]
                }
            },
            "Verbos con Preposición": {
                icon: "fa-link",
                data: {
                    "Verbos con A": [
                        { en: "to approach", es: ["acercarse a"] },
                        { en: "to get used to", es: ["acostumbrarse a"] },
                        { en: "to encourage to", es: ["animar a"] },
                        { en: "to learn to", es: ["aprender a"] },
                        { en: "to help to", es: ["ayudar a"] },
                        { en: "to begin to", es: ["empezar a", "comenzar a"] },
                        { en: "to invite to", es: ["invitar a"] },
                        { en: "to play (a game)", es: ["jugar a"] },
                        { en: "to force to", es: ["obligar a"] },
                        { en: "to do again", es: ["volver a"] },
                        { en: "to ask (someone)", es: ["preguntar a"] },
                        { en: "to recommend to", es: ["recomendar a"] }
                    ],
                    "Verbos con DE": [
                        { en: "to have just (done something)", es: ["acabar de"] },
                        { en: "to remember", es: ["acordarse de"] },
                        { en: "to be glad about", es: ["alegrarse de"] },
                        { en: "to regret", es: ["arrepentirse de"] },
                        { en: "to get tired of", es: ["cansarse de"] },
                        { en: "to stop doing", es: ["dejar de"] },
                        { en: "to depend on", es: ["depender de"] },
                        { en: "to say goodbye to", es: ["despedirse de"] },
                        { en: "to fall in love with", es: ["enamorarse de"] },
                        { en: "to forget", es: ["olvidarse de"] },
                        { en: "to try to", es: ["tratar de"] },
                        { en: "to ask about (someone)", es: ["preguntar por"] }
                    ],
                    "Verbos con EN": [
                        { en: "to consist of", es: ["consistir en"] },
                        { en: "to trust in", es: ["confiar en"] },
                        { en: "to insist on", es: ["insistir en"] },
                        { en: "to think about", es: ["pensar en"] },
                        { en: "to agree to", es: ["quedar en"] }
                    ],
                    "Verbos con CON": [
                        { en: "to marry", es: ["casarse con"] },
                        { en: "to rely on", es: ["contar con"] },
                        { en: "to dream about", es: ["soñar con"] },
                        { en: "to trip over", es: ["tropezar con"] },
                        { en: "to meet up with", es: ["quedar con"] }
                    ],
                    "Verbos con POR/PARA": [
                        { en: "to worry about", es: ["preocuparse por"] },
                        { en: "to be interested in", es: ["interesarse por"] },
                        { en: "to protest about", es: ["protestar por"] },
                        { en: "to be used for", es: ["servir para"] },
                        { en: "to work for", es: ["trabajar para"] }
                    ],
                    "PEDIR y DAR LAS GRACIAS": [
                        { en: "to ask for something", es: ["pedir algo"] },
                        { en: "to ask someone for something", es: ["pedir algo a alguien"] },
                        { en: "to thank someone for something", es: ["dar las gracias a alguien por algo"] }
                    ]
                }
            },
            "Dar Consejos": {
                icon: "fa-comments",
                data: {
                    "Imperativo": [
                        { en: "Do exercise", es: ["haz deporte"] },
                        { en: "Go swimming", es: ["ve a nadar"] },
                        { en: "Try to relax", es: ["trata de relajarte"] },
                        { en: "Don't smoke", es: ["no fumes"] },
                        { en: "Don't eat animal fats", es: ["no comas grasas animales"] },
                        { en: "Don't abuse alcohol", es: ["no abuses del alcohol"] }
                    ],
                    "Recomendaciones": [
                        { en: "I advise you to do exercise", es: ["te aconsejo hacer deporte"] },
                        { en: "I recommend you study more", es: ["te recomiendo estudiar más"] },
                        { en: "I advise you to do exercise (subj)", es: ["te aconsejo que hagas deporte"] },
                        { en: "I recommend that you work less", es: ["te recomiendo que trabajes menos"] },
                        { en: "I advise you to go to the doctor", es: ["te aconsejo que vayas al médico"] }
                    ],
                    "Condicional": [
                        { en: "You should go to the doctor", es: ["deberías ir al médico"] },
                        { en: "You would need to eat less", es: ["tendrías que comer menos"] },
                        { en: "You could take better care of yourself", es: ["podrías cuidarte más"] }
                    ],
                    "En tu lugar": [
                        { en: "If I were you, I'd do exercise", es: ["yo en tu lugar haría deporte"] },
                        { en: "If I were you, I would stop smoking", es: ["yo que tú dejaría de fumar"] },
                        { en: "I would go to the doctor", es: ["yo iría al médico"] },
                        { en: "I would work less", es: ["yo trabajaría menos"] },
                        { en: "I would go out more", es: ["yo saldría más"] }
                    ]
                }
            },
            "Opiniones y Debate": {
                icon: "fa-gavel",
                data: {
                    "Opiniones": [
                        { en: "In my opinion...", es: ["en mi opinión"] },
                        { en: "From my point of view...", es: ["desde mi punto de vista"] },
                        { en: "I think that...", es: ["creo que", "pienso que"] },
                        { en: "It seems to me that...", es: ["me parece que"] },
                        { en: "It's true that...", es: ["es cierto que"] },
                        { en: "It's obvious that...", es: ["es evidente que"] },
                        { en: "I'm sure that...", es: ["estoy seguro de que"] }
                    ],
                    "Duda (Subjuntivo)": [
                        { en: "I don't think that...", es: ["no creo que"] },
                        { en: "I doubt that...", es: ["dudo que"] },
                        { en: "I'm not sure that...", es: ["no estoy seguro de que"] },
                        { en: "It's not true that...", es: ["no es cierto que", "no es verdad que"] },
                        { en: "It's not evident that...", es: ["no es evidente que"] },
                        { en: "It's possible that...", es: ["es posible que"] },
                        { en: "It's impossible that...", es: ["es imposible que"] }
                    ],
                    "Acuerdo": [
                        { en: "Yes, of course", es: ["sí claro"] },
                        { en: "You're right", es: ["tienes razón"] },
                        { en: "I think the same as you", es: ["yo pienso lo mismo que tú", "yo pienso igual que tú"] },
                        { en: "I share your opinion", es: ["comparto tu opinión"] },
                        { en: "I agree", es: ["estoy de acuerdo"] }
                    ],
                    "Desacuerdo": [
                        { en: "No way!", es: ["¡qué va!"] },
                        { en: "You're not right", es: ["no tienes razón"] },
                        { en: "I don't think the same", es: ["yo no pienso lo mismo"] },
                        { en: "I don't think so", es: ["a mí me parece que no"] },
                        { en: "I think not", es: ["yo creo que no"] },
                        { en: "I disagree", es: ["no estoy de acuerdo"] },
                        { en: "I don't see it that way", es: ["no lo veo así"] },
                        { en: "I think you're mistaken", es: ["creo que te equivocas"] }
                    ]
                }
            },
            "Transmitir Mensajes": {
                icon: "fa-envelope",
                data: {
                    "Reportar Preguntas": [
                        { en: "He asked me if I want to come", es: ["me ha preguntado si quiero venir"] },
                        { en: "They asked me if you can help", es: ["me han preguntado si puedes ayudarles"] },
                        { en: "They asked me what I'm bringing", es: ["me ha preguntado qué voy a llevar"] },
                        { en: "He asked me where you live", es: ["me ha preguntado dónde vivís"] },
                        { en: "He asked me when the party starts", es: ["me ha preguntado cuándo empieza la fiesta"] }
                    ],
                    "Reportar Órdenes": [
                        { en: "He told me to put on my coat", es: ["me ha dicho que me ponga el abrigo"] },
                        { en: "He told me not to be late", es: ["me ha dicho que no llegue tarde"] },
                        { en: "He asked me to call my mother", es: ["me ha pedido que llame a mi madre"] },
                        { en: "He told me to do the homework", es: ["me ha dicho que haga los deberes"] },
                        { en: "He told me not to drink so much coffee", es: ["me ha dicho que no beba tanto café"] },
                        { en: "He recommended that you work less", es: ["me ha recomendado que trabajes menos"] }
                    ],
                    "Favores y Permisos": [
                        { en: "Can you help me?", es: ["¿me puedes ayudar?"] },
                        { en: "Could you bring me a coffee?", es: ["¿me podrías traer un café?"] },
                        { en: "Can you lend me your phone?", es: ["¿me dejas tu móvil?"] },
                        { en: "Yes, of course", es: ["sí claro", "por supuesto"] },
                        { en: "Sorry, I can't", es: ["lo siento no puedo"] },
                        { en: "Not right now", es: ["ahora mismo no"] },
                        { en: "I'd rather not", es: ["prefiero que no"] }
                    ]
                }
            },
            "Sentimientos y Estados de Ánimo": {
                icon: "fa-heart",
                data: {
                    "TRISTEZA": [
                        { en: "It makes me sad (that...)", es: ["me pone triste que"] }
                    ],
                    "AMOR": [
                        { en: "I love (that...)", es: ["me encanta que"] },
                        { en: "I like (that...)", es: ["me gusta que"] },
                        { en: "It drives me crazy (that...)", es: ["me vuelve loco que", "me vuelve loca que"] }
                    ],
                    "ALEGRIA": [
                        { en: "It makes me happy (that...)", es: ["me pone contenta que", "me pone contento que", "me alegra que"] }
                    ],
                    "DOLOR": [
                        { en: "It hurts me (that...)", es: ["me duele que"] },
                        { en: "I feel sorry (that...)", es: ["me da lástima que", "me da pena que"] }
                    ],
                    "ENFADO": [
                        { en: "It annoys me (that...)", es: ["me da rabia que"] },
                        { en: "It bothers me (that...)", es: ["me molesta que"] },
                        { en: "It irritates me (that...)", es: ["me irrita que"] },
                        { en: "It makes me furious (that...)", es: ["me pone furioso que", "me pone furiosa que"] }
                    ],
                    "PREOCUPACION": [
                        { en: "It worries me (that...)", es: ["me preocupa que", "me inquieta que"] }
                    ],
                    "MIEDO": [
                        { en: "It scares me (that...)", es: ["me da miedo que", "me asusta que"] },
                        { en: "I panic (about...)", es: ["me da pánico"] },
                        { en: "It terrifies me (that...)", es: ["me aterroriza que"] }
                    ],
                    "INDIFERENCIA": [
                        { en: "I don't mind (that...)", es: ["me da igual que"] },
                        { en: "I don't care (that...)", es: ["no me importa que"] }
                    ],
                    "EXTRAÑEZA": [
                        { en: "It surprises me (that...)", es: ["me extraña que", "me sorprende que"] }
                    ],
                    "Ponerse + Adjetivo": [
                        { en: "I get happy when...", es: ["me pongo contenta cuando", "me pongo contento cuando"] },
                        { en: "I get sad when...", es: ["me pongo triste cuando"] },
                        { en: "We get happy if...", es: ["nos ponemos contentos si"] }
                    ],
                    "Cuando + Futuro": [
                        { en: "The world will improve when...", es: ["el mundo mejorará cuando"] },
                        { en: "There will be peace when...", es: ["habrá paz cuando"] },
                        { en: "Hunger will end when...", es: ["se acabará el hambre cuando"] }
                    ],
                    "Frases Personales": [
                        { en: "Before learning Spanish...", es: ["antes de aprender español"] },
                        { en: "My first job was as...", es: ["mi primer trabajo fue como"] },
                        { en: "My favourite city is...", es: ["mi ciudad favorita es"] },
                        { en: "Something I want to change is...", es: ["algo que quiero cambiar es"] }
                    ]
                }
            }
        };
        
        const level10Data = {
            "Anécdotas y Narración": {
                icon: "fa-book-open",
                data: {
                    "Conectores para Narrar": [
                        { en: "Because", es: ["porque"] },
                        { en: "It turns out that", es: ["resulta que"] },
                        { en: "And then", es: ["y entonces"] },
                        { en: "Anyway / Long story short", es: ["total, que"] },
                        { en: "So", es: ["así que"] },
                        { en: "Right? / Don't you think?", es: ["¿no?"] },
                        { en: "You know?", es: ["¿sabes?"] },
                        { en: "In the end", es: ["al final"] },
                        { en: "Since / As", es: ["como"] },
                        { en: "So that / Therefore", es: ["de modo que"] }
                    ],
                    "Estructura de una Anécdota": [
                        { en: "Once, a very strange thing happened to me...", es: ["a mí, una vez, me pasó una cosa muy rara"] },
                        { en: "A strange thing happened to us...", es: ["a nosotros nos pasó una cosa extraña"] },
                        { en: "I was at the beach with a friend and...", es: ["estaba en la playa con una amiga y"] },
                        { en: "We were in a town on the Costa del Sol and...", es: ["estábamos en un pueblo de la costa del sol y"] },
                        { en: "It was Sunday and there were many people.", es: ["era domingo y había mucha gente"] },
                        { en: "We had bathed and sunbathed and...", es: ["nos habíamos bañado y habíamos tomado el sol y"] },
                        { en: "And suddenly, a boy approaches us...", es: ["y, de pronto, se nos acerca un chico"] },
                        { en: "And then I say to him: 'Hey, but what are you doing?'", es: ["y entonces yo le digo: oye, ¿pero qué haces?"] },
                        { en: "And then he goes and says to me...", es: ["y entonces va él y me dice"] },
                        { en: "And what did you do?", es: ["¿y tú qué hiciste?"] },
                        { en: "And what did you guys say to him?", es: ["¿y vosotros qué le dijisteis?"] },
                        { en: "And what happened in the end?", es: ["¿y qué pasó al final?"] },
                        { en: "And how did it end?", es: ["¿y cómo terminó la cosa?"] },
                        { en: "Anyway, it was quite uncomfortable.", es: ["total, que fue bastante incómodo"] },
                        { en: "In the end, it was just a misunderstanding.", es: ["al final, fue solo un malentendido"] },
                        { en: "Well, there wasn't any problem.", es: ["vamos, que no hubo ningún problema"] },
                        { en: "Thank goodness nothing happened.", es: ["menos mal que no pasó nada"] },
                        { en: "Luckily, it all came to nothing.", es: ["por suerte, todo se quedó en nada"] }
                    ],
                    "Reacciones": [
                        { en: "How funny!", es: ["¡qué gracioso!"] },
                        { en: "How horrible!", es: ["¡qué horror!"] },
                        { en: "How ridiculous!", es: ["¡qué ridículo!"] },
                        { en: "Wow! / That's heavy!", es: ["¡qué fuerte!"] },
                        { en: "What a scare!", es: ["¡qué susto!"] },
                        { en: "How scary!", es: ["¡qué miedo!"] },
                        { en: "How gross!", es: ["¡qué asco!"] },
                        { en: "How fun!", es: ["¡qué divertido!"] },
                        { en: "How curious!", es: ["¡qué curioso!"] },
                        { en: "How embarrassing!", es: ["¡qué vergüenza!"] },
                        { en: "What a mess!", es: ["¡qué lío!"] },
                        { en: "How great!", es: ["¡qué bien!"] },
                        { en: "Well, thank goodness!", es: ["¡pues menos mal!"] },
                        { en: "How lucky!", es: ["¡qué suerte!"] },
                        { en: "What bad luck!", es: ["¡qué mala suerte!"] },
                        { en: "You don't say!", es: ["¡qué dices!"] }
                    ],
                    "Funciones del Diálogo": [
                        { en: "How annoying!", es: ["¡qué rabia!"] },
                        { en: "What a drag!", es: ["¡qué rollo!"] },
                        { en: "Oh yeah?", es: ["¿ah, sí?"] },
                        { en: "To Cuba!", es: ["¡a cuba!"] },
                        { en: "Yeah, clearly", es: ["ya, claro"] }
                    ]
                }
            },
            "Bromas y Humor": {
                icon: "fa-laugh-beam",
                data: {
                    "Tipos de Broma": [
                        { en: "Joke (verbal/story)", es: ["chiste", "un chiste", "el chiste"] },
                        { en: "Prank / Joke (physical/action)", es: ["broma", "una broma", "la broma"] },
                        { en: "Practical joke / Heavy prank", es: ["broma pesada", "una broma pesada"] },
                        { en: "Prankster / Joker", es: ["bromista", "un bromista", "el bromista"] }
                    ],
                    "Acciones y Verbos": [
                        { en: "To tell a joke", es: ["contar un chiste"] },
                        { en: "To joke around / banter", es: ["bromear"] },
                        { en: "To play pranks", es: ["gastar bromas", "hacer bromas"] },
                        { en: "To burst out laughing", es: ["echarse a reír"] },
                        { en: "To be funny (to someone)", es: ["hacer gracia"] }
                    ],
                    "Modismos y Expresiones": [
                        { en: "To pull someone's leg / tease", es: ["tomar el pelo"] },
                        { en: "To get a scare / be startled", es: ["darse un susto"] },
                        { en: "To miss (someone) / find strange", es: ["extrañar"] }
                    ]
                }
            }
        };

        // State Variables
        let currentLevel = 9;
        let currentUnitName = null;
        let groupedVocab = null;
        let currentQueue = [];
        let currentIndex = 0;
        let score = 0;
        let streak = 0;
        let isAnswered = false;
        let quizMode = 'spelling'; 
        let selectedCategories = [];
        let quizLength = 10;
        let hintLevel = 0; 
        
        // --- NEW: Weighting System for Confidence ---
        let wordWeights = {}; // Map: word_key -> weight. Default weight = 1. Lower confidence increases weight.

        // DOM Elements
        const screens = {
            level: document.getElementById('level-screen'), // New
            unit: document.getElementById('unit-screen'), // New
            start: document.getElementById('start-screen'),
            config: document.getElementById('config-screen'), 
            game: document.getElementById('game-screen'),
            result: document.getElementById('result-screen'),
            list: document.getElementById('list-screen'),
            header: document.getElementById('header-section')
        };
        const els = {
            questionWord: document.getElementById('question-word'),
            input: document.getElementById('answer-input'),
            submitBtn: document.getElementById('submit-btn'),
            nextBtn: document.getElementById('next-btn'),
            feedbackIcon: document.getElementById('feedback-icon'),
            messageArea: document.getElementById('message-area'),
            scoreDisplay: document.getElementById('score-display'),
            streakDisplay: document.getElementById('streak-display'),
            progressBar: document.getElementById('progress-bar'),
            finalScore: document.getElementById('final-score'),
            finalAccuracy: document.getElementById('final-accuracy'),
            resultEmoji: document.getElementById('result-emoji'),
            vocabListContainer: document.getElementById('vocab-list-container'),
            categorySelector: document.getElementById('category-selector'),
            spellingContainer: document.getElementById('spelling-mode-container'),
            mcContainer: document.getElementById('mc-mode-container'),
            accentKeys: document.getElementById('accent-keys'),
            hintBtn: document.getElementById('hint-btn'), 
            selectAllCheckbox: null, 
            quizLengthSelect: document.getElementById('quiz-length-select'),
            unitGrid: document.getElementById('unit-grid'), // New
            headerTitle: document.getElementById('header-title'),
            selectedUnitTitle: document.getElementById('selected-unit-title'),
            selectedUnitIcon: document.getElementById('selected-unit-icon'),
            confidenceContainer: document.getElementById('confidence-container'), // NEW
            unitScreenTitle: document.getElementById('unit-screen-title')
        };

        // --- Navigation Logic ---

        function hideAllScreens() {
            Object.values(screens).forEach(screen => {
                screen.classList.add('hidden');
                screen.classList.remove('flex'); 
            });
        }

        // 1. Initial Load - Show Level Screen
        // (Called by default html structure)

        // 2. Select Level
        function selectLevel(level) {
            currentLevel = level;
            hideAllScreens();
            renderUnitGrid(level);
            // Update title based on level
            els.unitScreenTitle.textContent = level === 9 ? "Nivel 9 Units" : "Nivel 10 Units";
            screens.unit.classList.remove('hidden');
            screens.unit.classList.add('flex');
        }

        function showLevelScreen() {
            hideAllScreens();
            screens.level.classList.remove('hidden');
            screens.level.classList.add('flex');
        }

        // 3. Render Unit Grid (Icons)
        function renderUnitGrid(level) {
            const dataToUse = level === 9 ? level9Data : level10Data;
            
            let gridHtml = Object.keys(dataToUse).map(unitName => {
                const unitData = dataToUse[unitName];
                return `
                    <div onclick="selectUnit('${unitName}')" class="unit-card bg-white p-4 rounded-2xl border-2 border-slate-100 cursor-pointer flex flex-col items-center justify-center text-center h-32 hover:border-indigo-200">
                        <div class="bg-indigo-50 text-indigo-600 p-3 rounded-full mb-3">
                            <i class="fas ${unitData.icon} text-2xl"></i>
                        </div>
                        <span class="font-bold text-slate-700 text-sm leading-tight">${unitName}</span>
                    </div>
                `;
            }).join('');
            
            // Add "All Units Challenge" button at the end if there are multiple units
            if (Object.keys(dataToUse).length > 1) {
                 gridHtml += `
                    <div onclick="selectAllUnitsChallenge()" class="unit-card bg-gradient-to-r from-indigo-600 to-purple-600 p-4 rounded-2xl border-2 border-transparent cursor-pointer flex flex-col items-center justify-center text-center h-32 text-white shadow-lg col-span-2">
                        <div class="bg-white/20 p-3 rounded-full mb-3">
                            <i class="fas fa-trophy text-2xl text-yellow-300"></i>
                        </div>
                        <span class="font-bold text-sm leading-tight">All Units Challenge</span>
                    </div>
                `;
            }
            
            els.unitGrid.innerHTML = gridHtml;
            // Hide the separate button container used previously since it's integrated now
            const oldButtonContainer = els.unitGrid.nextElementSibling;
            if(oldButtonContainer) oldButtonContainer.style.display = 'none';
        }

        // 4. Select Unit -> Show Main Menu
        function selectUnit(unitName) {
            currentUnitName = unitName;
            const dataToUse = currentLevel === 9 ? level9Data : level10Data;
            groupedVocab = dataToUse[unitName].data; // Access the data property
            selectedCategories = Object.keys(groupedVocab); // Default select all
            
            // Update Start Screen info
            els.selectedUnitTitle.textContent = unitName;
            els.selectedUnitIcon.innerHTML = `<i class="fas ${dataToUse[unitName].icon} text-4xl"></i>`;
            
            hideAllScreens();
            screens.start.classList.remove('hidden');
            screens.start.classList.add('flex');
        }
        
        // NEW: Select All Units Challenge
        function selectAllUnitsChallenge() {
            currentUnitName = "All Units Challenge";
            const dataToUse = currentLevel === 9 ? level9Data : level10Data;
            // Combine all data
            let combinedData = {};
            Object.values(dataToUse).forEach(unit => {
                Object.entries(unit.data).forEach(([cat, items]) => {
                    // Create unique category names to avoid collisions if identical names existed
                    // We append a random ID or parent key to make unique if needed, but simple merge is fine for now
                    // A better approach is to merge arrays if key exists
                    if (combinedData[cat]) {
                        combinedData[cat] = combinedData[cat].concat(items);
                    } else {
                        combinedData[cat] = items;
                    }
                });
            });
            groupedVocab = combinedData;
            selectedCategories = Object.keys(groupedVocab);
            
            // Update Start Screen
            els.selectedUnitTitle.textContent = `All Level ${currentLevel} Challenge`;
            els.selectedUnitIcon.innerHTML = `<i class="fas fa-trophy text-4xl text-yellow-500"></i>`;
            
            hideAllScreens();
            screens.start.classList.remove('hidden');
            screens.start.classList.add('flex');
        }

        function showUnitScreen() {
            hideAllScreens();
            screens.unit.classList.remove('hidden');
            screens.unit.classList.add('flex');
        }

        function showStartScreen() {
            hideAllScreens();
            screens.header.classList.add('hidden');
            screens.start.classList.remove('hidden');
            screens.start.classList.add('flex');
        }

        function showConfigScreen() {
            hideAllScreens();
            screens.config.classList.remove('hidden');
            screens.config.classList.add('flex');
            renderCategoryCheckboxes();
        }

        function showListScreen() {
            hideAllScreens();
            screens.list.classList.remove('hidden');
            screens.list.classList.add('flex');
            renderVocabList();
        }

        function handleGameScreenBack() {
            showStartScreen();
            alertUser("Quiz exited. Back to menu.", 'text-slate-600');
        }

        // --- Checkbox Logic ---

        function renderCategoryCheckboxes() {
            const keys = Object.keys(groupedVocab);
            els.categorySelector.innerHTML = keys.map(key => `
                <label class="flex items-center space-x-2 text-slate-700 cursor-pointer">
                    <input type="checkbox" name="category" value="${key}" 
                           ${selectedCategories.includes(key) ? 'checked' : ''} 
                           class="category-checkbox text-indigo-600 focus:ring-indigo-500 rounded">
                    <span class="text-xs font-medium">${key}</span>
                </label>
            `).join('');

            els.selectAllCheckbox = document.getElementById('select-all-categories');
            if (els.selectAllCheckbox) {
                 els.selectAllCheckbox.checked = selectedCategories.length === keys.length;
                 els.selectAllCheckbox.addEventListener('change', (e) => {
                    document.querySelectorAll('.category-checkbox').forEach(checkbox => {
                        checkbox.checked = e.target.checked;
                    });
                });
                
                document.querySelectorAll('.category-checkbox').forEach(checkbox => {
                    checkbox.addEventListener('change', updateSelectAllState);
                });
            }

            const modeRadio = document.querySelector(`input[name="quiz-mode"][value="${quizMode}"]`);
            if(modeRadio) modeRadio.checked = true;

            if (els.quizLengthSelect) {
                els.quizLengthSelect.value = quizLength.toString();
            }
        }
        
        function updateSelectAllState() {
            const total = document.querySelectorAll('.category-checkbox').length;
            const checked = document.querySelectorAll('.category-checkbox:checked').length;
            if (els.selectAllCheckbox) {
                els.selectAllCheckbox.checked = total === checked;
            }
        }

        // --- Game Logic ---

        function quickStartGame() {
            quizMode = 'spelling';
            quizLength = 10;
            selectedCategories = Object.keys(groupedVocab);
            startGame(quizLength);
        }

        function applyConfigAndStartGame() {
            selectedCategories = Array.from(document.querySelectorAll('.category-checkbox:checked')).map(cb => cb.value);
            const selectedMode = document.querySelector('input[name="quiz-mode"]:checked');
            quizMode = selectedMode ? selectedMode.value : 'spelling'; 
            quizLength = parseInt(els.quizLengthSelect.value, 10);

            if (selectedCategories.length === 0) {
                alertUser('Please select at least one category.', 'text-red-500');
                return;
            }
            startGame(quizLength);
        }

        function startGame(count) {
            
            let filteredVocab = [];
            selectedCategories.forEach(categoryKey => {
                if (groupedVocab[categoryKey]) {
                    filteredVocab.push(...groupedVocab[categoryKey]);
                }
            });

            // Initialize/Normalize weights for current session if not present
            // Note: In a real app with persistence, we'd load this from local storage
            filteredVocab.forEach(item => {
                const key = item.en; // Simple key
                if (!wordWeights[key]) wordWeights[key] = 1; // Default weight
            });

            const maxCount = filteredVocab.length;
            const finalCount = count === 999 ? maxCount : Math.min(count, maxCount);

            if (finalCount === 0) {
                 alertUser('No vocabulary found for the selected categories.', 'text-red-500');
                 return;
            }

            // Weighted Selection Logic
            // Instead of simple shuffle, we pick items based on weights
            currentQueue = generateWeightedQueue(filteredVocab, finalCount);
            
            currentIndex = 0;
            score = 0;
            streak = 0;
            isAnswered = false;

            // Use generic icon if in challenge mode
            let iconClass = "fa-trophy";
            if (currentUnitName !== "All Units Challenge" && !currentUnitName.includes("All Level")) {
                 const dataToUse = currentLevel === 9 ? level9Data : level10Data;
                 iconClass = dataToUse[currentUnitName].icon;
            }
            
            els.headerTitle.innerHTML = `<i class="fas ${iconClass} mr-2"></i>${currentUnitName}`;

            hideAllScreens();
            screens.game.classList.remove('hidden');
            screens.game.classList.add('flex');
            screens.header.classList.remove('hidden');
            
            updateStats();
            loadQuestion();
        }
        
        // NEW: Weighted Queue Generation
        function generateWeightedQueue(vocabList, count) {
            let queue = [];
            // Create a temporary pool that honors weights
            let pool = [...vocabList];
            
            for (let i = 0; i < count; i++) {
                if (pool.length === 0) break;
                
                // Calculate total weight of current pool
                let totalWeight = 0;
                pool.forEach(item => {
                    totalWeight += (wordWeights[item.en] || 1);
                });
                
                let randomVal = Math.random() * totalWeight;
                let selectedIndex = -1;
                
                for (let j = 0; j < pool.length; j++) {
                    randomVal -= (wordWeights[pool[j].en] || 1);
                    if (randomVal <= 0) {
                        selectedIndex = j;
                        break;
                    }
                }
                // Fallback (rounding errors)
                if (selectedIndex === -1) selectedIndex = pool.length - 1;
                
                queue.push(pool[selectedIndex]);
                pool.splice(selectedIndex, 1); // Remove selected to avoid duplicates in single quiz run
            }
            return queue;
        }

        function resetGame() {
            startGame(quizLength); // Re-roll the weighted queue
        }

        // --- Core Helpers ---

        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        function normalizeText(text) {
            return text.toLowerCase().replace(/[.,;...¡!¿?]/g, "").replace(/\s+/g, " ").trim();
        }

        function updateStats() {
            els.scoreDisplay.textContent = `${score}/${currentQueue.length}`;
            els.streakDisplay.textContent = streak;
            const progress = ((currentIndex) / currentQueue.length) * 100;
            els.progressBar.style.width = `${progress}%`;
        }

        function shakeInput() {
            if (quizMode === 'spelling') {
                els.input.classList.add('shake');
                setTimeout(() => { els.input.classList.remove('shake'); }, 500);
            }
        }
        
        function alertUser(message, className = 'text-red-500') {
            const container = document.getElementById('answer-area').parentElement; 
            const toast = document.createElement('div');
            toast.className = `absolute bottom-20 left-1/2 transform -translate-x-1/2 p-3 rounded-xl shadow-2xl z-50 bg-white border border-slate-200 ${className} font-semibold fade-in text-sm text-center w-3/4`;
            toast.textContent = message;
            container.appendChild(toast);
            setTimeout(() => { toast.remove(); }, 3000);
        }
        
        function handleEnter(event) {
            if (event.key === 'Enter' && quizMode === 'spelling' && !isAnswered) {
                checkAnswer();
            }
        }

        // --- Question & Answer Logic ---

        function showHint() {
            if (quizMode !== 'spelling' || isAnswered) return;

            const currentItem = currentQueue[currentIndex];
            const primaryAnswer = currentItem.es[0]; 
            const words = primaryAnswer.split(' ');
            let revealedHintParts = [];
            let allWordsCompleted = true;

            hintLevel++;

            for (const word of words) {
                const hintPart = word.substring(0, hintLevel);
                revealedHintParts.push(hintPart);
                if (hintPart.length < word.length) allWordsCompleted = false;
            }
            
            const newInputValue = revealedHintParts.join(' ');
            els.input.value = newInputValue;
            els.input.focus();
            els.input.setSelectionRange(newInputValue.length, newInputValue.length);

            if (allWordsCompleted) {
                alertUser("All letters revealed (check for accents!).", 'text-blue-500');
            } else {
                alertUser(`Hint: Revealed letter ${hintLevel}.`, 'text-blue-500');
            }
        }

        function generateMultipleChoiceOptions(currentItem) {
            const correctTranslation = currentItem.es[0];
            let filteredVocabForDistractors = [];
            // Use current queue's source unit(s) logic roughly
            // For simplicity, grab distractors from all current selected categories
            Object.values(groupedVocab).flat().forEach(item => filteredVocabForDistractors.push(item));
            
            const allTranslations = filteredVocabForDistractors.map(item => item.es[0]);
            const correctNormalized = currentItem.es.map(s => normalizeText(s));
            const incorrectOptions = allTranslations.filter(ans => {
                const normalizedAns = normalizeText(ans);
                return !correctNormalized.includes(normalizedAns);
            });
            const distractors = shuffle(incorrectOptions).slice(0, 3);
            const options = shuffle([correctTranslation, ...distractors]).slice(0, 4); 
            while (options.length < 4) { if (options.length < 4) options.push('...'); }
            return options;
        }

        function loadQuestion() {
            if (currentIndex >= currentQueue.length) {
                showResultScreen();
                return;
            }

            const currentItem = currentQueue[currentIndex];
            els.questionWord.textContent = currentItem.en;
            
            isAnswered = false;
            hintLevel = 0; 
            els.messageArea.textContent = '';
            els.messageArea.className = 'h-16 mt-4 flex items-center justify-center text-center font-medium';
            els.feedbackIcon.classList.add('hidden');
            els.submitBtn.classList.remove('hidden');
            els.nextBtn.classList.add('hidden');
            els.confidenceContainer.classList.add('hidden'); // Hide confidence on new question
            
            els.input.disabled = false;
            els.input.classList.remove('correct', 'incorrect');
            els.input.placeholder = "Type translation...";

            if (quizMode === 'spelling') {
                els.mcContainer.classList.add('hidden');
                els.spellingContainer.classList.remove('hidden');
                els.input.value = '';
                els.input.focus();
                els.hintBtn.classList.remove('hidden');
            } else { 
                els.spellingContainer.classList.add('hidden');
                els.mcContainer.classList.remove('hidden'); 
                els.hintBtn.classList.add('hidden');
                renderMultipleChoice(currentItem);
            }
            updateStats();
        }

        function renderMultipleChoice(currentItem) {
            const options = generateMultipleChoiceOptions(currentItem);
            els.mcContainer.innerHTML = options.map((option, index) => `
                <button data-answer="${option}" onclick="selectMultipleChoice(this, '${option}')"
                    class="mc-option w-full bg-white border-2 border-slate-200 text-slate-800 text-lg font-medium rounded-xl p-4 text-center focus:outline-none transition-all">
                    ${option}
                </button>
            `).join('');
        }
        
        let selectedMCOption = null;

        function selectMultipleChoice(button, selectedAnswer) {
            if (isAnswered) return;
            document.querySelectorAll('.mc-option').forEach(btn => btn.classList.remove('ring-4', 'ring-indigo-300', 'shadow-inner'));
            button.classList.add('ring-4', 'ring-indigo-300', 'shadow-inner');
            selectedMCOption = selectedAnswer;
        }

        function checkAnswer() {
            if (isAnswered) return;

            let isCorrect = false;
            let userAnswer = '';
            let correctAnswerString = '';
            const currentItem = currentQueue[currentIndex];

            if (quizMode === 'spelling') {
                userAnswer = els.input.value;
                const normalizedUserAnswer = normalizeText(userAnswer);
                const correctAnswers = currentItem.es;
                isCorrect = correctAnswers.some(ans => normalizeText(ans) === normalizedUserAnswer);
                correctAnswerString = correctAnswers.join(' / ');
                
                if (isCorrect) {
                     els.input.disabled = true;
                     els.input.classList.add('correct');
                } else {
                     shakeInput();
                     els.input.classList.add('incorrect');
                }
            } else { 
                if (!selectedMCOption) {
                    alertUser('Please select an option.', 'text-red-500');
                    return;
                }
                userAnswer = selectedMCOption;
                const correctAnswers = currentItem.es;
                isCorrect = correctAnswers.some(ans => normalizeText(ans) === normalizeText(userAnswer));
                correctAnswerString = correctAnswers.join(' / ');

                document.querySelectorAll('.mc-option').forEach(btn => {
                    const optionAnswer = btn.getAttribute('data-answer');
                    const isOptionCorrect = correctAnswers.some(ans => normalizeText(ans) === normalizeText(optionAnswer));
                    if (isOptionCorrect) btn.classList.add('correct');
                    if (normalizeText(optionAnswer) === normalizeText(userAnswer) && !isCorrect) btn.classList.add('incorrect');
                    btn.disabled = true;
                });
                selectedMCOption = null; 
            }

            isAnswered = true;
            els.submitBtn.classList.add('hidden');
            
            // Show Feedback
            if (isCorrect) {
                score++;
                streak++;
                els.messageArea.className = 'h-16 mt-4 flex items-center justify-center text-center font-medium text-teal-600 bg-teal-50 rounded-lg fade-in';
                els.messageArea.innerHTML = `¡Correcto! <i class="fas fa-check-circle ml-2"></i>`;
                els.feedbackIcon.innerHTML = `<i class="fas fa-check-circle text-teal-500"></i>`;
                els.feedbackIcon.classList.remove('hidden');
            } else {
                streak = 0;
                els.messageArea.className = 'h-16 mt-4 flex items-center justify-center text-center font-medium text-red-600 bg-red-50 rounded-lg fade-in';
                els.messageArea.innerHTML = `¡Incorrecto! <span class="font-bold text-indigo-600 ml-1">${correctAnswerString}</span>`;
                els.feedbackIcon.innerHTML = `<i class="fas fa-times-circle text-red-500"></i>`;
                els.feedbackIcon.classList.remove('hidden');
            }
            
            // Show Confidence Rating instead of direct next button
            els.confidenceContainer.classList.remove('hidden');
            
            updateStats();
        }
        
        // NEW: Handle Confidence Rating
        function rateConfidence(rating) {
            const currentItem = currentQueue[currentIndex];
            const wordKey = currentItem.en;
            
            // Update Weights based on logic requested:
            // 1-2: Low confidence -> Increase weight (see more often)
            // 3: Medium -> Neutral
            // 4-5: High confidence -> Decrease weight (see less often)
            
            let currentWeight = wordWeights[wordKey] || 1;
            
            if (rating <= 2) {
                wordWeights[wordKey] = currentWeight + 2; // Increase significantly
            } else if (rating === 3) {
                // Neutral, maybe slight bump to ensure reinforcement
                wordWeights[wordKey] = currentWeight + 0.5;
            } else {
                wordWeights[wordKey] = Math.max(0.1, currentWeight * 0.5); // Halve weight, min 0.1
            }
            
            // Proceed to next question automatically
            nextQuestion();
        }

        function nextQuestion() {
            if (currentIndex < currentQueue.length - 1) {
                currentIndex++;
                loadQuestion();
            } else {
                showResultScreen();
            }
        }

        function showResultScreen() {
            hideAllScreens();
            screens.header.classList.add('hidden');
            screens.result.classList.remove('hidden');
            screens.result.classList.add('flex');

            const totalQuestions = currentQueue.length;
            const accuracy = totalQuestions > 0 ? ((score / totalQuestions) * 100).toFixed(0) : 0;
            
            els.finalScore.textContent = `${score}/${totalQuestions}`;
            els.finalAccuracy.textContent = `${accuracy}%`;

            if (accuracy >= 90) els.resultEmoji.textContent = '🌟';
            else if (accuracy >= 70) els.resultEmoji.textContent = '✅';
            else els.resultEmoji.textContent = '👍';
        }

        function renderVocabList() {
            els.vocabListContainer.innerHTML = Object.entries(groupedVocab).map(([category, items]) => {
                const listItems = items.map(item => `
                    <div class="flex justify-between items-start py-3 border-b border-slate-100">
                        <span class="text-slate-700 font-medium w-1/2 pr-2">${item.en}</span>
                        <span class="text-indigo-600 font-semibold w-1/2 text-right">${item.es.join(' / ')}</span>
                    </div>
                `).join('');
                return `
                    <div class="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                        <h3 class="text-lg font-bold text-slate-800 mb-2 border-b-2 border-indigo-200 pb-1">${category}</h3>
                        ${listItems}
                    </div>
                `;
            }).join('');
        }

        function addChar(char) {
            if (quizMode === 'spelling' && !isAnswered) {
                const input = els.input;
                const start = input.selectionStart;
                const end = input.selectionEnd;
                input.value = input.value.substring(0, start) + char + input.value.substring(end);
                input.focus();
                input.selectionStart = input.selectionEnd = start + 1;
            }
        }
        
        // Show Level Screen on load
        showLevelScreen();

    </script>
</body>
</html>