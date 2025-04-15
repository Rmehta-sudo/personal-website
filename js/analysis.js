// Text analysis script with real-time functionality
document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('text-input');
    const analyzeBtn = document.getElementById('analyze-btn');
    const resultsContainer = document.getElementById('results');
    
    // Update the button text to reflect the new functionality
    analyzeBtn.textContent = "Analyzing in real-time...";
    analyzeBtn.disabled = true;
    analyzeBtn.style.backgroundColor = "#6c757d";
    analyzeBtn.style.cursor = "default";
    
    // Sample texts
    const sampleTexts = {
      sample1: `To be, or not to be, that is the question:
  Whether 'tis nobler in the mind to suffer
  The slings and arrows of outrageous fortune,
  Or to take arms against a sea of troubles
  And by opposing end them. To die—to sleep,
  No more; and by a sleep to say we end
  The heart-ache and the thousand natural shocks
  That flesh is heir to: 'tis a consummation
  Devoutly to be wish'd. To die, to sleep;
  To sleep, perchance to dream—ay, there's the rub:
  For in that sleep of death what dreams may come,
  When we have shuffled off this mortal coil,
  Must give us pause—there's the respect
  That makes calamity of so long life.`,
      sample2: `The morning sun cast long shadows across the field as Sarah made her way to the old oak tree. She had been coming here for years, a quiet place to think and reflect on her life. The tree had stood for generations, its branches reaching toward the sky like fingers grasping for the heavens. 
  
  Under its shade, she felt a peace that was hard to find elsewhere. The world around her was changing too quickly—technology advancing, people moving in and out of her life, the small town growing into something unrecognizable. But the tree remained constant.`,
      sample3: `The advancement of artificial intelligence in natural language processing has revolutionized how humans interact with machines. Through sophisticated neural network architectures and machine learning algorithms, computers can now understand and generate human language with remarkable accuracy. This progress has significant implications for various sectors including healthcare, education, customer service, and content creation.
  
  Neural networks, particularly transformer models like BERT, GPT, and T5, have demonstrated impressive capabilities in tasks such as translation, summarization, question answering, and text generation. These models leverage self-attention mechanisms to capture contextual relationships between words, allowing them to understand nuances in language that previous rule-based systems could not grasp.`
    };
  
    // Event listeners for sample texts
    document.getElementById('sample-1').addEventListener('click', function() {
      textInput.value = sampleTexts.sample1;
      // Trigger analysis on sample selection
      analyzeAndDisplayText();
      // Trigger the input event to auto-resize the textarea
      textInput.dispatchEvent(new Event('input'));
    });
    
    document.getElementById('sample-2').addEventListener('click', function() {
      textInput.value = sampleTexts.sample2;
      // Trigger analysis on sample selection
      analyzeAndDisplayText();
      // Trigger the input event to auto-resize the textarea
      textInput.dispatchEvent(new Event('input'));
    });
    
    document.getElementById('sample-3').addEventListener('click', function() {
      textInput.value = sampleTexts.sample3;
      // Trigger analysis on sample selection
      analyzeAndDisplayText();
      // Trigger the input event to auto-resize the textarea
      textInput.dispatchEvent(new Event('input'));
    });
  
    // Lists for tokenization
    const pronouns = [
      'i', 'me', 'my', 'mine', 'myself',
      'you', 'your', 'yours', 'yourself', 'yourselves',
      'he', 'him', 'his', 'himself',
      'she', 'her', 'hers', 'herself',
      'it', 'its', 'itself',
      'we', 'us', 'our', 'ours', 'ourselves',
      'they', 'them', 'their', 'theirs', 'themselves',
      'this', 'that', 'these', 'those',
      'who', 'whom', 'whose', 'which', 'what'
    ];
  
    const prepositions = [
      'about', 'above', 'across', 'after', 'against', 'along', 'amid', 'among',
      'around', 'at', 'before', 'behind', 'below', 'beneath', 'beside', 'between',
      'beyond', 'by', 'concerning', 'considering', 'despite', 'down', 'during',
      'except', 'for', 'from', 'in', 'inside', 'into', 'like', 'near', 'of',
      'off', 'on', 'onto', 'out', 'outside', 'over', 'past', 'regarding',
      'since', 'through', 'throughout', 'to', 'toward', 'under', 'underneath',
      'until', 'unto', 'up', 'upon', 'with', 'within', 'without'
    ];
  
    const indefiniteArticles = ['a', 'an'];
  
    // Real-time analysis - add input event listener to the text input
    textInput.addEventListener('input', debounce(analyzeAndDisplayText, 300));
  
    // Combined function to analyze and display text
    function analyzeAndDisplayText() {
      const text = textInput.value;
      
      if (!text) {
        // Clear the results if text is empty
        resultsContainer.innerHTML = '';
        return;
      }
  
      // Clear previous results
      resultsContainer.innerHTML = '';
      
      // Perform text analysis
      const analysis = analyzeText(text);
      
      // Display results
      displayResults(analysis);
    }
  
    // Debounce function to prevent excessive analysis during rapid typing
    function debounce(func, wait) {
      let timeout;
      return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          func.apply(context, args);
        }, wait);
      };
    }
  
    // Text analysis function
    function analyzeText(text) {
      // Basic counts
      const letterCount = (text.match(/[a-zA-Z]/g) || []).length;
      const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
      const spaceCount = (text.match(/\s/g) || []).length;
      const newlineCount = (text.match(/\n/g) || []).length;
      const specialSymbolCount = (text.match(/[^\w\s\n]/g) || []).length;
      
      // Tokenize text for word analysis (convert to lowercase and remove punctuation)
      const tokens = text.toLowerCase()
        .replace(/[^\w\s]/g, ' ')
        .split(/\s+/)
        .filter(token => token.length > 0);
      
      // Count pronouns
      const pronounCounts = {};
      tokens.forEach(token => {
        if (pronouns.includes(token)) {
          pronounCounts[token] = (pronounCounts[token] || 0) + 1;
        }
      });
      
      // Count prepositions
      const prepositionCounts = {};
      tokens.forEach(token => {
        if (prepositions.includes(token)) {
          prepositionCounts[token] = (prepositionCounts[token] || 0) + 1;
        }
      });
      
      // Count indefinite articles
      const articleCounts = {};
      tokens.forEach(token => {
        if (indefiniteArticles.includes(token)) {
          articleCounts[token] = (articleCounts[token] || 0) + 1;
        }
      });
      
      return {
        letterCount,
        wordCount,
        spaceCount,
        newlineCount,
        specialSymbolCount,
        pronounCounts,
        prepositionCounts,
        articleCounts
      };
    }
  
    // Display results function
    function displayResults(analysis) {
      // Create basic counts section
      const basicCountsSection = document.createElement('div');
      basicCountsSection.className = 'result-section';
      basicCountsSection.innerHTML = `
        <h3>Basic Text Statistics</h3>
        <div class="word-count">
          <div class="count-item">Letters<span>${analysis.letterCount}</span></div>
          <div class="count-item">Words<span>${analysis.wordCount}</span></div>
          <div class="count-item">Spaces<span>${analysis.spaceCount}</span></div>
          <div class="count-item">Newlines<span>${analysis.newlineCount}</span></div>
          <div class="count-item">Special Symbols<span>${analysis.specialSymbolCount}</span></div>
        </div>
      `;
      resultsContainer.appendChild(basicCountsSection);
      
      // Create pronouns section
      const pronounSection = document.createElement('div');
      pronounSection.className = 'result-section';
      pronounSection.innerHTML = `<h3>Pronouns (${Object.keys(analysis.pronounCounts).length} types found)</h3>`;
      
      if (Object.keys(analysis.pronounCounts).length > 0) {
        const wordGroup = document.createElement('div');
        wordGroup.className = 'word-group';
        
        // Sort pronouns by count (descending)
        const sortedPronouns = Object.entries(analysis.pronounCounts)
          .sort((a, b) => b[1] - a[1]);
        
        sortedPronouns.forEach(([pronoun, count]) => {
          const wordItem = document.createElement('div');
          wordItem.className = 'word-item';
          wordItem.innerHTML = `
            <div>${pronoun}</div>
            <div class="word-count-badge">${count}</div>
          `;
          wordGroup.appendChild(wordItem);
        });
        
        pronounSection.appendChild(wordGroup);
      } else {
        pronounSection.innerHTML += `<p>No pronouns found in the text.</p>`;
      }
      
      resultsContainer.appendChild(pronounSection);
      
      // Create prepositions section
      const prepositionSection = document.createElement('div');
      prepositionSection.className = 'result-section';
      prepositionSection.innerHTML = `<h3>Prepositions (${Object.keys(analysis.prepositionCounts).length} types found)</h3>`;
      
      if (Object.keys(analysis.prepositionCounts).length > 0) {
        const wordGroup = document.createElement('div');
        wordGroup.className = 'word-group';
        
        // Sort prepositions by count (descending)
        const sortedPrepositions = Object.entries(analysis.prepositionCounts)
          .sort((a, b) => b[1] - a[1]);
        
        sortedPrepositions.forEach(([preposition, count]) => {
          const wordItem = document.createElement('div');
          wordItem.className = 'word-item';
          wordItem.innerHTML = `
            <div>${preposition}</div>
            <div class="word-count-badge">${count}</div>
          `;
          wordGroup.appendChild(wordItem);
        });
        
        prepositionSection.appendChild(wordGroup);
      } else {
        prepositionSection.innerHTML += `<p>No prepositions found in the text.</p>`;
      }
      
      resultsContainer.appendChild(prepositionSection);
      
      // Create indefinite articles section
      const articleSection = document.createElement('div');
      articleSection.className = 'result-section';
      articleSection.innerHTML = `<h3>Indefinite Articles (${Object.keys(analysis.articleCounts).length} types found)</h3>`;
      
      if (Object.keys(analysis.articleCounts).length > 0) {
        const wordGroup = document.createElement('div');
        wordGroup.className = 'word-group';
        
        // Sort articles by count (descending)
        const sortedArticles = Object.entries(analysis.articleCounts)
          .sort((a, b) => b[1] - a[1]);
        
        sortedArticles.forEach(([article, count]) => {
          const wordItem = document.createElement('div');
          wordItem.className = 'word-item';
          wordItem.innerHTML = `
            <div>${article}</div>
            <div class="word-count-badge">${count}</div>
          `;
          wordGroup.appendChild(wordItem);
        });
        
        articleSection.appendChild(wordGroup);
      } else {
        articleSection.innerHTML += `<p>No indefinite articles found in the text.</p>`;
      }
      
      resultsContainer.appendChild(articleSection);
    }
  
    // Auto-adjust textarea height based on content
    textInput.addEventListener('input', function() {
      if (this.scrollHeight > 200) {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight + 5) + 'px';
      }
    });
  
    // Initial analysis if there's text in the input (e.g., from page reload)
    if (textInput.value.trim()) {
      analyzeAndDisplayText();
    }
  });