import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { Cast } from '../../../core/entities/cast.entity';
import { useTheme } from '../../context/ThemeContext';

interface Props {
  cast: Cast[];
}

export const CastHorizontalList = ( { cast }: Props ) => {
  const { colors } = useTheme();
  if ( cast.length === 0 ) return null;

  return (
    <View style={ styles.container }>
      <Text style={ [styles.title, { color: colors.sectionTitle }] }>Reparto</Text>
      <FlatList
        data={ cast }
        horizontal
        keyExtractor={ item => `${ item.id }-${ item.character }` }
        showsHorizontalScrollIndicator={ false }
        contentContainerStyle={ styles.list }
        renderItem={ ( { item } ) => (
          <View style={ styles.card }>
            { item.profilePath ? (
              <Image
                source={ { uri: item.profilePath } }
                style={ styles.avatar }
                resizeMode="cover"
              />
            ) : (
              <View style={ [styles.avatar, styles.avatarPlaceholder, { backgroundColor: colors.skeletonBg }] }>
                <Text style={ styles.avatarInitial }>
                  { item.name.charAt( 0 ) }
                </Text>
              </View>
            ) }
            <Text style={ [styles.name, { color: colors.castName }] } numberOfLines={ 2 }>{ item.name }</Text>
            <Text style={ [styles.character, { color: colors.castCharacter }] } numberOfLines={ 2 }>{ item.character }</Text>
          </View>
        ) }
      />
    </View>
  );
};

const styles = StyleSheet.create( {
  container: {
    marginVertical: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 10,
  },
  list: {
    paddingHorizontal: 12,
    gap: 12,
  },
  card: {
    width: 90,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 6,
  },
  avatarPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitial: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#666',
  },
  name: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  character: {
    fontSize: 11,
    textAlign: 'center',
  },
} );
