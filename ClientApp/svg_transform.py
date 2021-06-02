from typing import Dict, List, Iterable
from argparse import ArgumentParser, Namespace
from collections import namedtuple
from functools import reduce
from os import listdir
from os.path import isfile, join
from io import IOBase
import re


Param = namedtuple(
  typename='Param', 
  field_names=['old', 'new']
)

DEFAULT_COLORS_REPLACE = [
  Param(r'{textColor}', r'"{textColor}"'),
  Param(r'{svgColor}', r'"{primaryColor}"'),
  Param(r'{svgColorSecondary}', r'"{secondaryColor}"'),
  Param(r'{svgColorTertiary}', r'"{tertiaryColor}"'),
  Param(r'{props.size ?=== ?"100%" \? props.size : null}', r'"{width}"'),
  Param(r'{props.height ?=== ?"100%" \? props.height : null}', r'"{height}"'),
]


def main():
  args = parseArgs()
  path = args.path
  fileName = args.fileName
  params = getParams(args.replace)
  colors = DEFAULT_COLORS_REPLACE

  if fileName is not None:
    paths = [path + fileName]
  else:
    paths = [path + f for f in listdir(path) if isfile(join(path, f))]


  for path in paths:
    newContent = None
    with open(path, 'r') as f:
      newContent = replaceValues(f.read(), params)
      newContent = replaceValues(newContent, colors)

    with open(path, 'w') as f:
      f.write(newContent)


def parseArgs() -> List[str]:
  parser = ArgumentParser()
  parser.add_argument('--path', default='public/illustrations/')
  parser.add_argument('--fileName', default=None)
  parser.add_argument('--replace', nargs='+', default='')
  return parser.parse_args()


def getParams(args: List[str]) -> Iterable[Param]:
  return map(argToParam, args)

def argToParam(arg) -> Param:
  params = re.search(
    pattern=r'(?P<old>.+):(?P<new>.+)',
    string=arg
  ).groupdict()

  return Param(params['old'], params['new'])


def replaceValues(svg: str, values: Iterable[Param]) -> str:
  def replaceOccurencies(svg: str, param: Param):
    return re.sub(param.old, param.new, svg, re.MULTILINE)

  return reduce(replaceOccurencies, values, svg)


if __name__ == '__main__':
  main()