import xml.etree.ElementTree as ET

#tengo que tener xampp
#en la carpeta xampp hay una carpeta htdocs
#meto la carpeta F1Desktop en htdocs
#inicio apache con xmp y e meto en la url de debajo
#HTTP://LOCALHOST/F1DESKTOP
#en las dimensiones  de tarjetas nunca dimensiones absolutas

def generar_kml(archivo_xml, archivo_kml):
    # cargar el archivo XML
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

    # crear y escribir en el archivo kml
    with open(archivo_kml, 'w', encoding='utf-8') as kml:
        #prólogo
        kml.write("<?xml version='1.0' encoding='UTF-8'?>\n")
        kml.write("<kml xmlns='http://www.opengis.net/kml/2.2'>\n")
        kml.write("<Document>\n")
        kml.write("<name>Circuito KML</name>\n")

        #hago linea roja y más gruesa
        kml.write("<Style id='lineStyle'>\n")
        kml.write("<LineStyle>\n")
        kml.write("<color>ff0000ff</color>\n")  
        kml.write("<width>5</width>\n")       
        kml.write("</LineStyle>\n")
        kml.write("</Style>\n")

        kml.write("<Placemark>\n")
        kml.write("<name>Planimetría del Circuito</name>\n")
        kml.write("<LineString>\n")
        kml.write("<tessellate>1</tessellate>\n")
        kml.write("<coordinates>\n")

        # procesar coordenadas xml
        for tramo in raiz.findall('.//ns:tramo', namespaces=namespace):
            
            longitud = tramo.find('.//ns:longitud', namespaces=namespace).get('valor')
            latitud = tramo.find('.//ns:latitud', namespaces=namespace).get('valor')
            altitud = tramo.find('.//ns:altitud', namespaces=namespace).get('valor')
               
            #print(longitud, latitud, altitud) #verificar que extrae informacion   
            kml.write(f"          {longitud},{latitud},{altitud}\n")
            
        kml.write("</coordinates>\n")
        kml.write("</LineString>\n")
        kml.write("</Placemark>\n")
        kml.write("</Document>\n")
        kml.write("</kml>\n")

    print(f"Archivo KML '{archivo_kml}' generado exitosamente.")

# main
if __name__ == "__main__":
    archivo_xml = "xml/circuitoEsquema.xml"
    archivo_kml = "xml/circuito.kml"
    generar_kml(archivo_xml, archivo_kml)
