#!/usr/local/bin/python3

import sys

import blockdiag
import blockdiag.builder
import blockdiag.drawer
import blockdiag.parser

import actdiag
import actdiag.builder
import actdiag.drawer
import actdiag.parser

import seqdiag
import seqdiag.builder
import seqdiag.drawer
import seqdiag.parser

import nwdiag
import nwdiag.builder
import nwdiag.drawer
import nwdiag.parser

import packetdiag
import packetdiag.builder
import packetdiag.drawer
import packetdiag.parser

import rackdiag
import rackdiag.builder
import rackdiag.drawer
import rackdiag.parser

from blockdiag.utils.bootstrap import Application, Options

class Printer():
    def __init__(self, drawer):
        class DiagramDraw(drawer.DiagramDraw):
            def save(self, size=None):
                result = super(DiagramDraw, self).save(size)
                print(result)
                return result

        self.DiagramDraw = DiagramDraw

class App(Application):
    def __init__(self, diag):
        super(App, self).__init__()
        self.module = diag
        self.module.drawer = Printer(self.module.drawer)

    def parse_options(self, args):
        super(App, self).parse_options(args)
        self.options.type = 'SVG'
        self.options.output = None
        self.options.nodoctype = True

type = sys.argv[1]
diag = {
    'blockdiag': blockdiag,
    'actdiag': actdiag,
    'seqdiag': seqdiag,
    'nwdiag': nwdiag,
    'packetdiag': packetdiag,
    'rackdiag': rackdiag,
}[type]

App(diag).run(sys.argv[2:])

