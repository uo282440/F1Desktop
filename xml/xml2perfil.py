import xml.etree.ElementTree as ET

def generar_svg(archivo_xml, archivo_svg):
    try:
        arbol = ET.parse(archivo_xml)
        raiz = arbol.getroot()
    except ET.ParseError:
        print("Error al parsear el archivo XML.")
        return
    except FileNotFoundError:
        print(f"No se encuentra el archivo {archivo_xml}.")
        return

    namespace = {'ns': 'http://www.uniovi.es'}

    #listas para las coordenadas
    distancias = []
    altitudes = []

    # extraer distancia y altitud
    for tramo in raiz.findall('.//ns:tramo', namespaces=namespace):
        distancia = float(tramo.find('.//ns:distancia', namespaces=namespace).get('valor'))
        altitud = float(tramo.find('.//ns:coordenadas/ns:altitud', namespaces=namespace).get('valor'))
        distancias.append(distancia)
        altitudes.append(altitud)

    #SVG
    width = 800  
    height = 400  
    offset_x = 50 
    offset_y =  height - 50  
    scale_x = width / max(distancias) 
    scale_y = height / (max(altitudes) + 10)

    # crea la polilínea
    points = " ".join(f"{offset_x + distancia * scale_x},{offset_y - altitud * scale_y}" 
                      for distancia, altitud in zip(distancias, altitudes))
    
    #crear  SVG
    with open(archivo_svg, 'w', encoding='utf-8') as svg:
        svg.write('<?xml version="1.0" encoding="UTF-8"?>\n')
        svg.write('<svg xmlns="http://www.w3.org/2000/svg" width="{0}" height="{1}">\n'.format(width, height))
        svg.write('<polyline points="{}" fill="none" stroke="red" stroke-width="2" />\n'.format(points))
        svg.write('<line x1="{0}" y1="{1}" x2="{2}" y2="{1}" stroke="black" stroke-width="2"/>\n'.format(offset_x, offset_y, offset_x + width))
        svg.write('</svg>\n')

    print(f"Archivo SVG '{archivo_svg}' generado exitosamente.")

if __name__ == "__main__":
    archivo_xml = "xml/circuitoEsquema.xml" 
    archivo_svg = "xml/altimetria.svg"
    generar_svg(archivo_xml, archivo_svg)
