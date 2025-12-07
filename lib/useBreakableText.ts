'use client';

import { useState, useEffect, useCallback } from 'react';

const WRONG_SYMBOLS = ['!', '@', '#', '$', '%', '^', '&', '*', '~', '?', '±', '§'];

interface BreakableElement {
  id: string;
  element: HTMLElement;
  section: string;
  originalText: string;
}

export function useBreakableText() {
  const [breakableElements, setBreakableElements] = useState<BreakableElement[]>([]);
  const [currentBroken, setCurrentBroken] = useState<string | null>(null);

  // Scan DOM for breakable elements
  const scanBreakableElements = useCallback(() => {
    const elements = document.querySelectorAll('[data-breakable]');
    const mapped: BreakableElement[] = [];

    console.log('🔍 Scanning for breakable elements, found:', elements.length);

    elements.forEach((el, index) => {
      if (el instanceof HTMLElement && el.textContent) {
        // Find which section this element belongs to
        const section = el.closest('section');
        const sectionId = section?.id || 'unknown';

        console.log(`Element ${index}: "${el.textContent?.substring(0, 20)}" in section "${sectionId}"`);

        mapped.push({
          id: `breakable-${sectionId}-${index}`,
          element: el,
          section: sectionId,
          originalText: el.textContent,
        });
      }
    });

    console.log('✅ Found breakable elements:', mapped.length, 'elements across sections');
    setBreakableElements(mapped);
  }, []);

  // Initialize on mount
  useEffect(() => {
    // Wait for DOM to be ready (increased delay for animations to finish)
    const timer = setTimeout(() => {
      console.log('🚀 Initializing breakable text scanner');
      scanBreakableElements();
    }, 1000);
    return () => clearTimeout(timer);
  }, [scanBreakableElements]);

  // Break a random element in a specific section
  const breakRandomInSection = useCallback((sectionId: string): string | null => {
    console.log('🎲 Looking for breakable elements in section:', sectionId);
    console.log('📊 Total breakable elements:', breakableElements.length);
    console.log('🔍 Current broken element:', currentBroken);

    // Find all elements in this section that aren't already broken
    const elementsInSection = breakableElements.filter(
      (el) => el.section === sectionId && el.id !== currentBroken
    );

    console.log('✨ Found elements in section:', elementsInSection.length);
    if (elementsInSection.length > 0) {
      console.log('📝 Element IDs:', elementsInSection.map(el => el.id));
    }

    if (elementsInSection.length === 0) {
      console.log('❌ No elements available to break in section:', sectionId);
      return null;
    }

    // Pick a random element
    const randomElement = elementsInSection[Math.floor(Math.random() * elementsInSection.length)];
    const { element, originalText, id } = randomElement;

    // Store original text
    element.setAttribute('data-correct-text', originalText);

    // Pick random character to replace (avoid spaces)
    const nonSpaceIndices = [];
    for (let i = 0; i < originalText.length; i++) {
      if (originalText[i] !== ' ') {
        nonSpaceIndices.push(i);
      }
    }

    if (nonSpaceIndices.length === 0) {
      return null;
    }

    const randomIndex = nonSpaceIndices[Math.floor(Math.random() * nonSpaceIndices.length)];
    const wrongSymbol = WRONG_SYMBOLS[Math.floor(Math.random() * WRONG_SYMBOLS.length)];

    // Create broken text
    const brokenText =
      originalText.substring(0, randomIndex) +
      wrongSymbol +
      originalText.substring(randomIndex + 1);

    element.textContent = brokenText;
    element.setAttribute('data-glitch', brokenText);
    element.classList.add('broken');

    setCurrentBroken(id);
    return id;
  }, [breakableElements, currentBroken]);

  // Repair a broken element
  const repairElement = useCallback((elementId: string) => {
    const brokenElement = breakableElements.find((el) => el.id === elementId);
    if (!brokenElement) return;

    const { element } = brokenElement;
    const correctText = element.getAttribute('data-correct-text');

    if (correctText) {
      element.textContent = correctText;
      element.classList.remove('broken');
      element.removeAttribute('data-correct-text');
      element.removeAttribute('data-glitch');
      setCurrentBroken(null);
    }
  }, [breakableElements]);

  // Get position of a breakable element
  const getElementPosition = useCallback((elementId: string): { x: number; y: number } | null => {
    const brokenElement = breakableElements.find((el) => el.id === elementId);
    if (!brokenElement) return null;

    const rect = brokenElement.element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    return {
      x: rect.left + scrollLeft + rect.width / 2,
      y: rect.top + scrollTop + rect.height / 2,
    };
  }, [breakableElements]);

  return {
    breakableElements,
    currentBroken,
    breakRandomInSection,
    repairElement,
    getElementPosition,
    scanBreakableElements,
  };
}
