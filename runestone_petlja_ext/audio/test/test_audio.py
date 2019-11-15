"""
Test audio directive
"""

__author__ = 'Jovan'

import unittest
import time
from unittest import TestCase
from runestone.unittest_base import module_fixture_maker, RunestoneTestCase
from selenium.webdriver import ActionChains
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.by import By
import selenium.webdriver.support.ui as ui

mf, setUpModule, tearDownModule = module_fixture_maker(__file__, True)


class AudioTests(RunestoneTestCase):
     
    def test_general(self):
        
         """
         Testing if Audio loaded 
         """
         self.driver.get(self.host + "/index.html") 

         self.driver.execute_script("document.querySelector('.audio').play();")
             
if __name__ == '__main__':
    unittest.main()
