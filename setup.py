# -*- coding: utf-8 -*-
"""`sphinx_rtd_theme` lives on `Github`_.
.. _github: https://github.com/Petlja/RunestoneExtensions
"""

from io import open
from setuptools import setup


setup(
    name='runestone_petlja_ext',
    version=0.1,
    url='https://github.com/Petlja/RunestoneExtensions',
    #license='MIT',
    #author='Dave Snider, Read the Docs, Inc. & contributors',
    #author_email='dev@readthedocs.org',
    description='Runestone extensions by Petlja',
    #long_description=open('README.rst', encoding='utf-8').read(),
    zip_safe=False,
    packages=['bootstrap_petlja_theme', 'runestone_petlja_ext'],
    package_data={'bootstrap_petlja_theme': [
        'theme.conf',
        '*.html',
        'static/css/*.css',
        'static/js/*.js',
        'static/css/*.css_t',
        'static/js/*.js_t',
        'static/font/*.*'
    ]},
    include_package_data=True,
    # See http://www.sphinx-doc.org/en/stable/theming.html#distribute-your-theme-as-a-python-package
    entry_points = {
        'sphinx.html_themes': [
            'bootstrap_petlja_theme = bootstrap_petlja_theme',
        ]
    },
    classifiers=[
        'Framework :: Sphinx',
        'Framework :: Sphinx :: Theme',
        'Development Status :: 5 - Production/Stable',
        'License :: OSI Approved :: MIT License',
        'Environment :: Console',
        'Environment :: Web Environment',
        'Intended Audience :: Developers',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.3',
        'Programming Language :: Python :: 3.4',
        'Programming Language :: Python :: 3.5',
        'Programming Language :: Python :: 3.6',
        'Operating System :: OS Independent',
        'Topic :: Documentation',
        'Topic :: Software Development :: Documentation',
    ],
)